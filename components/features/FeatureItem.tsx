import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { FeatureKey, IFeature } from "../../lib/types/feature";
import { setInert } from "../../utilities/inert";
import Icon from "../UI/Icon";

interface Props {
  feature: IFeature;
  active: boolean;
  onToggle: (key: FeatureKey) => void;
}

const FeatureItem: React.FC<Props> = ({ feature, active, onToggle }) => {
  const { t } = useLanguage();
  const detailRef = useRef<HTMLDivElement>(null);
  const detailId = `detail-${feature.key}`;

  useEffect(() => {
    setInert(detailRef.current, !active);
  }, [active]);

  return (
    <article
      className={`feature-item${active ? " is-active" : ""}`}
      id={feature.id}
    >
      <h3>
        <button
          className="feature-trigger"
          aria-expanded={active ? "true" : "false"}
          aria-controls={detailId}
          data-feature={feature.key}
          onClick={() => onToggle(feature.key)}
        >
          <span className="feature-icon" aria-hidden="true">
            {feature.icon === "scan" ? <Icon name="scan" /> : feature.icon}
          </span>
          <span>
            {t[feature.title]}
            {feature.small && (
              <>
                {" "}
                <small>{t[feature.small]}</small>
              </>
            )}
          </span>
        </button>
      </h3>
      <div
        ref={detailRef}
        className="feature-detail"
        id={detailId}
        aria-hidden={active ? "false" : "true"}
      >
        <div className="feature-detail-inner">
          <div className="feature-detail-content">
            <p>{t[feature.text]}</p>
            {feature.tag && (
              <span className="feature-tag">{t[feature.tag]}</span>
            )}
            {feature.eligibility && (
              <span className="eligibility-tag">{t[feature.eligibility]}</span>
            )}
            {feature.link && (
              <a className="text-link" href={feature.link.href}>
                {t[feature.link.label]} <Icon name="arrow" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeatureItem;
