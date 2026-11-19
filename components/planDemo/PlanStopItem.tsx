import React, { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IPlanStop } from "../../lib/types/planDemo";

interface Props {
  stop: IPlanStop;
}

const PlanStopItem: React.FC<Props> = ({ stop }) => {
  const { t } = useLanguage();
  const [failedUrls, setFailedUrls] = useState<string[]>([]);
  const validImages = stop.imageUrls.filter((u) => !failedUrls.includes(u));
  const placeText = [stop.placeName, stop.address].filter(Boolean).join(" · ");
  const tagText = stop.tag
    ? String(stop.tag).replace(/[_-]+/g, " ").toLowerCase()
    : "";

  return (
    <article className="plan-stop">
      <time className="plan-stop-time">{stop.time || "—"}</time>
      <span className="plan-stop-dot" aria-hidden="true"></span>
      <div className="plan-stop-main">
        <strong>{stop.title}</strong>
        <span>{stop.description}</span>
        {placeText && <span className="plan-stop-place">{placeText}</span>}
        {stop.mapLink && (
          <a
            className="plan-stop-map"
            href={stop.mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.planOpenMap}
          </a>
        )}
        {tagText && <span className="plan-stop-tag">{tagText}</span>}
        {validImages.length > 0 && (
          <div className="plan-stop-gallery">
            {validImages.map((url, index) => (
              <img
                key={url}
                src={url}
                alt={`${stop.title} photo ${index + 1}`}
                loading="lazy"
                onError={() =>
                  setFailedUrls((prev) =>
                    prev.includes(url) ? prev : [...prev, url]
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default PlanStopItem;
