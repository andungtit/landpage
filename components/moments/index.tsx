import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IMoment } from "../../lib/types/content";
import { moments } from "../../mock/moments";
import { renderLines } from "../../utilities/renderLines";
import MomentCard from "./MomentCard";

const Moments = () => {
  const { t } = useLanguage();
  return (
    <section className="moments section-pad" aria-labelledby="moments-title">
      <div className="section-heading reveal">
        <span className="eyebrow">{t.momentsEyebrow}</span>
        <h2 id="moments-title">{renderLines(t.momentsTitle)}</h2>
      </div>
      <div className="moment-grid">
        {(moments as IMoment[]).map((moment) => (
          <MomentCard key={moment.number} moment={moment} />
        ))}
      </div>
    </section>
  );
};

export default Moments;
