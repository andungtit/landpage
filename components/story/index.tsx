import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { renderLines } from "../../utilities/renderLines";
import Icon from "../UI/Icon";

const TravelStory = () => {
  const { t } = useLanguage();
  return (
    <section className="travel-story" aria-label={t.storyAria}>
      <img
        src="/assets/everyone-wants-to-go.jpg"
        alt={t.storyAlt}
        loading="lazy"
      />
      <div className="travel-story-shade"></div>
      <div className="travel-story-copy reveal">
        <span className="eyebrow">{t.storyEyebrow}</span>
        <h2>{renderLines(t.storyTitle)}</h2>
        <a className="button white" href="#download">
          {t.storyCta} <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
};

export default TravelStory;
