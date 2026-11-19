import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { renderLines } from "../../utilities/renderLines";
import Icon from "../UI/Icon";

const Intro = () => {
  const { t } = useLanguage();
  const statementLabel = `${t.statement1} ${t.statement2} ${t.statement3}`;

  return (
    <section className="intro section-pad" id="intro">
      <div className="intro-top reveal">
        <span className="eyebrow">{t.introEyebrow}</span>
        <p>{renderLines(t.introTop)}</p>
      </div>
      <h2 className="statement" aria-label={statementLabel}>
        <span className="statement-line" aria-hidden="true">
          {t.statement1}
        </span>
        <span className="statement-line" aria-hidden="true">
          {t.statement2}
        </span>
        <span className="statement-line" aria-hidden="true">
          {t.statement3}
        </span>
      </h2>
      <div className="intro-bottom reveal">
        <p>{t.introBottom}</p>
        <a className="text-link" href="#features">
          {t.introLink} <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
};

export default Intro;
