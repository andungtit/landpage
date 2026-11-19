import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IHeroCard } from "../../lib/types/content";
import { heroCards } from "../../mock/heroCards";
import { renderLines } from "../../utilities/renderLines";
import Icon from "../UI/Icon";
import PlanOpenButton from "../UI/PlanOpenButton";
import HeroCard from "./HeroCard";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="hero-intro">
          <div className="eyebrow-pill">
            <span className="status-dot"></span> {t.heroEyebrow}
          </div>
          <h1 id="hero-title">{renderLines(t.heroTitle)}</h1>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hero-side hero-side-left">
          <span className="eyebrow">{t.heroSideEyebrow}</span>
          <h2>{renderLines(t.heroSideTitle)}</h2>
          <p>{t.heroSideText}</p>
        </div>

        <div className="hero-side hero-side-right">
          <span className="mini-pin">
            <Icon name="pin" /> {t.heroPin}
          </span>
          <p>{renderLines(t.heroRightText)}</p>
          <PlanOpenButton>{t.heroRightCta}</PlanOpenButton>
        </div>

        <div
          className="hero-deck"
          role="region"
          aria-roledescription="carousel"
          aria-label={t.heroDeckAria}
          tabIndex={0}
        >
          {(heroCards as IHeroCard[]).map((card) => (
            <HeroCard key={card.offset} card={card} />
          ))}
        </div>

        <div className="hero-bottom">
          <div className="scene-dots" aria-hidden="true">
            <span className="current">01</span>
            <span>02</span>
            <span>03</span>
          </div>
          <a href="#intro" className="scroll-hint">
            {t.scrollToExplore} <span>↓</span>
          </a>
          <div className="hero-controls" aria-label={t.browsePreviews}>
            <button className="deck-prev" aria-label={t.previousFeature}>
              <Icon name="arrow" />
            </button>
            <button className="deck-next" aria-label={t.nextFeature}>
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
