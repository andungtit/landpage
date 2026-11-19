import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../../lib/config";
import { IFaq } from "../../lib/types/content";
import { faqs } from "../../mock/faqs";

const Faq = () => {
  const { t } = useLanguage();
  return (
    <section className="faq section-pad" aria-labelledby="faq-title">
      <div className="reveal">
        <span className="eyebrow">{t.faqEyebrow}</span>
        <h2 id="faq-title">{t.faqTitle}</h2>
      </div>
      <div className="faq-list reveal">
        {(faqs as IFaq[]).map((item) => (
          <details key={item.question}>
            <summary>
              {t[item.question]}
              <span>+</span>
            </summary>
            <p>{t[item.answer]}</p>
          </details>
        ))}
        <details>
          <summary>
            {t.faq5Q}
            <span>+</span>
          </summary>
          <p>
            {t.faq5APrefix}{" "}
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              App Store
            </a>{" "}
            {t.faq5AOr}{" "}
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play
            </a>
            .
          </p>
        </details>
      </div>
    </section>
  );
};

export default Faq;
