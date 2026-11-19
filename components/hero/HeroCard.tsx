import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IHeroCard } from "../../lib/types/content";
import Icon from "../UI/Icon";

interface Props {
  card: IHeroCard;
}

const HeroCard: React.FC<Props> = ({ card }) => {
  const { t } = useLanguage();
  const className = [
    "hero-card",
    card.center && "hero-center",
    card.tone,
  ]
    .filter(Boolean)
    .join(" ");
  const deviceClass = card.payment ? "device payment-device" : "device";
  const label = t[card.label] ?? card.label;
  const small = t[card.small] ?? card.small;

  return (
    <a className={className} href={card.href} data-offset={card.offset}>
      <div className="hero-card-label">
        <span>{label}</span>
        <small>{small}</small>
      </div>
      <div className={deviceClass}>
        <img
          src={card.img}
          alt={t[card.alt]}
          width={786}
          height={1704}
          {...(card.center ? ({ fetchpriority: "high" } as any) : {})}
        />
      </div>
      <span className="card-foot">
        {t[card.foot]}
        <span className="plus">
          <Icon name="plus" />
        </span>
      </span>
    </a>
  );
};

export default HeroCard;
