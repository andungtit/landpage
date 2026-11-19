import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { APP_STORE_URL, PLAN_DEMO_LOCALES } from "../../lib/config";
import {
  IPlan,
  IPlanDemoRootState,
  IPlanError,
  IPlanInput,
  PlanGroup,
  PlanView,
} from "../../lib/types/planDemo";
import {
  planDestinations,
  planGroupNames,
  planGroups,
  planLoadingMessages,
  planLoadingSteps,
} from "../../mock/planDemo";
import { requestPlan } from "../../services/planApi";
import { planDemoActions } from "../../store/planDemo-slice";
import Icon from "../UI/Icon";
import PlanStopItem from "./PlanStopItem";

const PlanDemo = () => {
  const { t, locale } = useLanguage();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: IPlanDemoRootState) => state.planDemo.isOpen
  );

  const [view, setView] = useState<PlanView>("form");
  const [destination, setDestination] = useState("Singapore");
  const [group, setGroup] = useState<PlanGroup>("friends");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeDest, setActiveDest] = useState("Singapore");
  const [plan, setPlan] = useState<IPlan | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const destinationRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showForm = useCallback(() => {
    abortRef.current?.abort();
    stopTimer();
    setSubmitting(false);
    setView("form");
    requestAnimationFrame(() => destinationRef.current?.focus());
  }, [stopTimer]);

  const closePlan = useCallback(() => {
    abortRef.current?.abort();
    stopTimer();
    dispatch(planDemoActions.closePlanDemo());
    document.body.classList.remove("plan-open");
    if (typeof lastFocusedRef.current?.focus === "function") {
      lastFocusedRef.current.focus();
    }
  }, [dispatch, stopTimer]);

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      document.body.classList.add("plan-open");
      showForm();
    } else {
      document.body.classList.remove("plan-open");
    }
  }, [isOpen, showForm]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) closePlan();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closePlan]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      stopTimer();
      document.body.classList.remove("plan-open");
    },
    [stopTimer]
  );

  // Bản tiếng Việt của site gốc không render #plan-demo
  if (!PLAN_DEMO_LOCALES.includes(locale || "en")) return null;

  const advanceStep = (next: number) => {
    setLoadingStep((prev) =>
      Math.max(prev, Math.min(next, planLoadingMessages.length - 1))
    );
  };

  const runSubmit = async () => {
    const input: IPlanInput = {
      destination: destination.trim() || "Singapore",
      group,
      budget: budget.trim(),
      notes,
    };
    setActiveDest(input.destination);
    setSubmitting(true);
    setLoadingStep(0);
    setView("loading");
    stopTimer();
    timerRef.current = setInterval(() => {
      setLoadingStep((prev) =>
        prev < planLoadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 2600);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const result = await requestPlan(input, {
        locale,
        signal: controller.signal,
        onStep: advanceStep,
      });
      stopTimer();
      setPlan(result);
      setSubmitting(false);
      setView("result");
    } catch (err) {
      stopTimer();
      const error = err as IPlanError;
      if (
        error?.status === 404 ||
        error?.status === 401 ||
        error?.status === 403
      ) {
        setErrorMsg(t.planErrorNotAvailable);
      } else if (error?.name === "AbortError") {
        setErrorMsg(t.planErrorTimeout);
      } else {
        setErrorMsg(t.planErrorGeneric);
      }
      setSubmitting(false);
      setView("error");
    } finally {
      abortRef.current = null;
    }
  };

  const [msgTitle, msgCopyFn] = planLoadingMessages[loadingStep] as [
    string,
    (d: string) => string
  ];
  const progress = `${((loadingStep + 1) / planLoadingMessages.length) * 100}%`;
  const groupName =
    (planGroupNames as Record<string, string>)[group] || "shared plan";

  return (
    <section
      className="plan-demo"
      id="plan-demo"
      hidden={!isOpen}
      aria-hidden={isOpen ? "false" : "true"}
      aria-labelledby="plan-demo-title"
    >
      <div
        className="plan-demo-backdrop"
        data-plan-close=""
        tabIndex={-1}
        onClick={closePlan}
      ></div>
      <div
        className="plan-panel"
        data-lenis-prevent=""
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-demo-title"
        aria-describedby="plan-demo-description"
      >
        <span className="plan-handle" aria-hidden="true"></span>
        <button
          className="plan-close"
          type="button"
          data-plan-close=""
          aria-label={t.planClose}
          onClick={closePlan}
        >
          ×
        </button>
        <div className="plan-panel-top">
          <span>{t.planTop}</span>
          <span>01—02</span>
        </div>

        <div
          className="plan-form-view"
          id="plan-form-view"
          hidden={view !== "form"}
        >
          <div className="plan-panel-heading">
            <span className="eyebrow">{t.planFormEyebrow}</span>
            <h2 id="plan-demo-title">{t.planFormTitle}</h2>
            <p id="plan-demo-description">{t.planFormDescription}</p>
          </div>
          <form
            className="plan-form"
            id="plan-form"
            onSubmit={(event) => {
              event.preventDefault();
              runSubmit();
            }}
          >
            <label
              className="plan-field plan-field-wide"
              htmlFor="plan-destination"
            >
              {t.planDestinationLabel}
              <input
                ref={destinationRef}
                id="plan-destination"
                name="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t.planDestinationPlaceholder}
                autoComplete="address-level2"
                list="plan-destinations"
                required
              />
            </label>
            <datalist id="plan-destinations">
              {planDestinations.map((dest) => (
                <option key={dest} value={dest}></option>
              ))}
            </datalist>

            <fieldset className="plan-field plan-field-wide plan-fieldset">
              <legend>{t.planWhoLabel}</legend>
              <div
                className="plan-segmented"
                role="group"
                aria-label={t.planGroupAria}
              >
                {planGroups.map((item) => {
                  const selected = group === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      className={selected ? "is-selected" : undefined}
                      data-plan-group={item.key}
                      aria-pressed={selected ? "true" : "false"}
                      onClick={() => setGroup(item.key as PlanGroup)}
                    >
                      {t[item.title]}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="group" id="plan-group" value={group} />
            </fieldset>

            <label className="plan-field" htmlFor="plan-budget">
              {t.planBudgetLabel}{" "}
              <span className="plan-optional">{t.planOptional}</span>
              <input
                id="plan-budget"
                name="budget"
                type="text"
                inputMode="decimal"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={t.planBudgetPlaceholder}
              />
            </label>

            <div className="plan-field plan-fixed">
              <span>{t.planPreviewLength}</span>
              <strong>{t.planOneDay}</strong>
              <small>{t.planMoreDays}</small>
            </div>

            <label className="plan-field plan-field-wide" htmlFor="plan-notes">
              {t.planMoodLabel}
              <textarea
                id="plan-notes"
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.planMoodPlaceholder}
              ></textarea>
            </label>

            <p className="plan-note">
              <span className="plan-note-dot"></span>
              {t.planNote}
            </p>
            <button
              className="button blue plan-submit"
              type="submit"
              disabled={submitting}
            >
              <span className="plan-submit-label" hidden={submitting}>
                {t.planSubmit}
              </span>
              <span className="plan-submit-loading" hidden={!submitting}>
                {t.planSubmitLoading}
              </span>
              <Icon name="arrow" />
            </button>
          </form>
        </div>

        <div
          className="plan-loading-view"
          id="plan-loading-view"
          hidden={view !== "loading"}
          role="status"
          aria-live="polite"
          style={
            { ["--plan-progress" as string]: progress } as React.CSSProperties
          }
        >
          <div className="plan-loader" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="plan-panel-heading plan-loading-heading">
            <span className="eyebrow">{t.planLoadingEyebrow}</span>
            <h2 id="plan-loading-title">{msgTitle}</h2>
            <p id="plan-loading-copy">{msgCopyFn(activeDest)}</p>
          </div>
          <ol className="plan-loading-steps" aria-label={t.planLoadingAria}>
            {planLoadingSteps.map((stepKey, index) => {
              const cls = [
                index === loadingStep && "is-active",
                index < loadingStep && "is-done",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li
                  key={stepKey}
                  data-loading-step={index}
                  className={cls || undefined}
                >
                  {t[stepKey]}
                </li>
              );
            })}
          </ol>
        </div>

        <div
          className="plan-result-view"
          id="plan-result-view"
          hidden={view !== "result"}
        >
          <div className="plan-panel-heading plan-result-heading">
            <span className="eyebrow">{t.planResultEyebrow}</span>
            <h2 id="plan-result-title">
              {plan?.title || "Singapore, one good day."}
            </h2>
            <p id="plan-result-description">
              {plan?.description ||
                "A real OnePlan route with places, photos and useful map details."}
            </p>
          </div>
          <div className="plan-day-card">
            <div className="plan-day-top">
              <span id="plan-day-label">
                {plan
                  ? plan.source === "existing"
                    ? "DAY 1 · ONEPLAN ROUTE"
                    : "DAY 1 · NEW ONEPLAN ROUTE"
                  : "DAY 1 · SATURDAY"}
              </span>
              <span id="plan-day-meta">
                {plan
                  ? `${plan.stops.length} places · ${groupName}`
                  : "4 places · shared plan"}
              </span>
            </div>
            <div className="plan-route" id="plan-route" aria-live="polite">
              {plan?.stops.map((stop, index) => (
                <PlanStopItem key={`${stop.title}-${index}`} stop={stop} />
              ))}
            </div>
          </div>
          <div className="plan-locked-card">
            <div className="plan-locked-copy">
              <span className="eyebrow">{t.planLockedEyebrow}</span>
              <h3>{t.planLockedTitle}</h3>
              <p>{t.planLockedText}</p>
            </div>
            <div className="plan-lock-mark" aria-hidden="true">
              ＋
            </div>
          </div>
          <div className="plan-result-actions">
            <button
              className="button plan-secondary"
              type="button"
              data-plan-edit=""
              onClick={showForm}
            >
              {t.planTryAnother}
            </button>
            <a
              className="button dark"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.planSeeFull} <Icon name="arrow" />
            </a>
          </div>
          <p className="plan-result-note">{t.planResultNote}</p>
        </div>

        <div
          className="plan-error-view"
          id="plan-error-view"
          hidden={view !== "error"}
          role="alert"
        >
          <div className="plan-panel-heading">
            <span className="eyebrow">{t.planErrorEyebrow}</span>
            <h2>{t.planErrorTitle}</h2>
            <p id="plan-error-message">{errorMsg || t.planErrorDefault}</p>
          </div>
          <div className="plan-result-actions">
            <button
              className="button plan-secondary"
              type="button"
              data-plan-retry=""
              onClick={runSubmit}
            >
              {t.planTryAgain}
            </button>
            <a
              className="button dark"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.planOpenApp} <Icon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanDemo;
