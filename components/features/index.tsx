import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { scrollToTarget } from "../../lib/smoothScroll";
import {
  FeatureKey,
  IFeature,
  IFeatureRootState,
} from "../../lib/types/feature";
import { features } from "../../mock/features";
import { featureActions } from "../../store/feature-slice";
import { renderLines } from "../../utilities/renderLines";
import Icon from "../UI/Icon";
import WordReveal from "../UI/WordReveal";
import FeatureItem from "./FeatureItem";

const Features = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const activeFeature = useSelector(
    (state: IFeatureRootState) => state.feature.activeFeature
  );

  // Đồng bộ hash #feature-* và click vào hero card dẫn tới #feature-* (port từ oneplan.js)
  useEffect(() => {
    const syncFeatureHash = () => {
      if (!location.hash.startsWith("#feature-")) return;
      const key = location.hash.replace("#feature-", "") as FeatureKey;
      const match = (features as IFeature[]).find((f) => f.key === key);
      if (match) dispatch(featureActions.selectFeature(match.key));
    };

    const onDocClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest?.(
        'a[href^="#feature-"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const key = href.replace("#feature-", "") as FeatureKey;
      const match = (features as IFeature[]).find((f) => f.key === key);
      if (!match) return;
      event.preventDefault();
      dispatch(featureActions.selectFeature(match.key));
      history.pushState(null, "", href);
      scrollToTarget(document.querySelector("#features"));
    };

    syncFeatureHash();
    window.addEventListener("hashchange", syncFeatureHash);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("hashchange", syncFeatureHash);
      document.removeEventListener("click", onDocClick);
    };
  }, [dispatch]);

  return (
    <section
      className="features features-split"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="feature-manifesto">
        <WordReveal id="features-title" text={t.featuresTitle} />
        <a className="feature-invite" href="#download">
          <span>{renderLines(t.featureInvite)}</span>
          <strong>
            {t.featureInviteCta} <span>→</span>
          </strong>
          <img
            src="/assets/logo-icon.png"
            alt=""
            width={90}
            height={90}
            loading="lazy"
          />
        </a>
        <p className="feature-manifesto-note">
          {renderLines(t.featureManifestoNote)}
        </p>
      </div>

      <div className="feature-directory">
        <span className="eyebrow feature-directory-label">
          {t.featureDirectoryLabel}
        </span>
        <div className="feature-list">
          {(features as IFeature[]).map((feature) => (
            <FeatureItem
              key={feature.key}
              feature={feature}
              active={activeFeature === feature.key}
              onToggle={(key) => dispatch(featureActions.toggleFeature(key))}
            />
          ))}
        </div>
        <span className="feature-directory-note">
          {t.featureDirectoryNote} <Icon name="arrow" />
        </span>
      </div>
    </section>
  );
};

export default Features;
