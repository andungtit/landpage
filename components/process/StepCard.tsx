import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IStep } from "../../lib/types/content";

interface Props {
  step: IStep;
}

const StepCard: React.FC<Props> = ({ step }) => {
  const { t } = useLanguage();
  return (
    <article className="step reveal">
      <div className="step-icon step-art">
        <img src={step.img} alt="" width={1024} height={1024} loading="lazy" />
        <span>{step.number}</span>
      </div>
      <h3>{t[step.title]}</h3>
      <p>{t[step.text]}</p>
    </article>
  );
};

export default StepCard;
