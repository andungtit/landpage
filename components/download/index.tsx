import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import StoreButtons from "../UI/StoreButtons";
import WordReveal from "../UI/WordReveal";

const Download = () => {
  const { t } = useLanguage();
  return (
    <section
      className="download section-pad"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="download-photos" aria-hidden="true">
        <img
          className="download-photo left-photo"
          src="/assets/oneplan/travel-profile.webp"
          alt=""
          loading="lazy"
        />
        <img
          className="download-photo right-photo"
          src="/assets/oneplan/travel-split.webp"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="download-content reveal">
        <img
          className="app-icon"
          src="/assets/logo-icon.png"
          alt="OnePlan"
          width={68}
          height={68}
          loading="lazy"
        />
        <span className="eyebrow">{t.downloadEyebrow}</span>
        <WordReveal id="download-title" text={t.downloadTitle} />
        <p>{t.downloadText}</p>
        <StoreButtons />
        <span className="download-note">{t.downloadNote}</span>
      </div>
    </section>
  );
};

export default Download;
