import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IMoment } from "../../lib/types/content";

interface Props {
  moment: IMoment;
}

const MomentCard: React.FC<Props> = ({ moment }) => {
  const { t } = useLanguage();
  return (
    <article className="moment-card reveal">
      <div className="image-wrap">
        <img
          src={moment.img}
          alt={t[moment.alt]}
          width={1800}
          height={1350}
          loading="lazy"
        />
      </div>
      <span className="card-number">{t[moment.number]}</span>
      <h3>{t[moment.title]}</h3>
      <p>{t[moment.text]}</p>
    </article>
  );
};

export default MomentCard;
