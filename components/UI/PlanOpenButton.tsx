import React from "react";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { PLAN_DEMO_LOCALES } from "../../lib/config";
import { planDemoActions } from "../../store/planDemo-slice";
import Icon from "./Icon";

interface Props {
  className?: string;
  children: React.ReactNode;
}

/**
 * Nút CTA "Make your next plan": mở modal Plan Demo (bản EN),
 * hoặc cuộn về #download (bản VI) — đúng như site gốc.
 */
const PlanOpenButton: React.FC<Props> = ({ className = "button blue", children }) => {
  const { locale } = useLanguage();
  const dispatch = useDispatch();
  const enabled = PLAN_DEMO_LOCALES.includes(locale || "en");

  if (!enabled) {
    return (
      <a className={className} href="#download">
        {children} <Icon name="arrow" />
      </a>
    );
  }

  return (
    <a
      className={className}
      href="#plan-demo"
      data-plan-open=""
      onClick={(event) => {
        event.preventDefault();
        dispatch(planDemoActions.openPlanDemo());
      }}
    >
      {children} <Icon name="arrow" />
    </a>
  );
};

export default PlanOpenButton;
