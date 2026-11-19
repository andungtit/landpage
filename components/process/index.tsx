import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IStep } from "../../lib/types/content";
import { steps } from "../../mock/steps";
import { renderLines } from "../../utilities/renderLines";
import Icon from "../UI/Icon";
import PlanOpenButton from "../UI/PlanOpenButton";
import WordReveal from "../UI/WordReveal";
import StepCard from "./StepCard";

const Process = () => {
  const { t } = useLanguage();
  return (
    <section
      className="process section-pad"
      id="how-it-works"
      aria-labelledby="process-title"
    >
      <div className="process-side reveal">
        <span className="eyebrow">{t.processEyebrow}</span>
        <div className="travel-stamp">
          <Icon name="globe" />
          <span>{renderLines(t.processStamp)}</span>
        </div>
      </div>

      <div className="process-content">
        <div className="reveal">
          <WordReveal id="process-title" text={t.processTitle} />
          <p className="section-copy">{renderLines(t.processCopy)}</p>
          <PlanOpenButton>{t.processCta}</PlanOpenButton>
        </div>

        <div className="steps">
          <div className="journey-track" aria-hidden="true">
            <span className="journey-line"></span>
            <span className="journey-plane">
              <Icon name="arrow" />
            </span>
          </div>
          {(steps as IStep[]).map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
