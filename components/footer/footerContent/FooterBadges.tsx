import React from "react";
import { useLanguage } from "../../../hooks/useLanguage";
import {
  PRODUCT_HUNT_BADGE,
  PRODUCT_HUNT_URL,
  UNIKORN_BADGE,
  UNIKORN_URL,
} from "../../../lib/config";

const FooterBadges = () => {
  const { t } = useLanguage();
  return (
    <div className="footer-badges" aria-label={t.footerBadgesAria}>
      <a
        className="ph-badge"
        href={PRODUCT_HUNT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          alt={t.phBadgeAlt}
          width={250}
          height={54}
          loading="lazy"
          src={PRODUCT_HUNT_BADGE}
        />
      </a>
      <a
        className="uni-badge"
        href={UNIKORN_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={UNIKORN_BADGE}
          alt={t.uniBadgeAlt}
          width={264}
          height={64}
          loading="lazy"
        />
      </a>
    </div>
  );
};

export default FooterBadges;
