import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { renderLines } from "../../utilities/renderLines";
import Icon from "../UI/Icon";
import WordReveal from "../UI/WordReveal";

const Payments = () => {
  const { t } = useLanguage();
  return (
    <section
      className="payments section-pad"
      id="payments"
      aria-labelledby="payments-title"
    >
      <div className="payments-copy reveal">
        <span className="eyebrow country-eyebrow">
          <span>🇻🇳</span> {t.paymentsEyebrow}
        </span>
        <WordReveal
          id="payments-title"
          text={t.paymentsTitle}
          accent={t.paymentsTitleAccent}
        />
        <p>{renderLines(t.paymentsText)}</p>
        <div className="eligibility">
          <Icon name="globe" />
          <div>
            <strong>{t.paymentsEligibilityTitle}</strong>
            <p>{t.paymentsEligibilityText}</p>
          </div>
        </div>
        <a className="button dark" href="#download">
          {t.paymentsCta} <Icon name="arrow" />
        </a>
      </div>

      <div className="payments-visual reveal">
        <div className="payment-mockup device">
          <img
            src="/assets/oneplan/payment-transaction.png"
            alt={t.paymentsMockupAlt}
            width={786}
            height={1704}
            loading="lazy"
          />
        </div>
        <div className="payment-note">
          <span className="payment-note-icon">
            <Icon name="scan" />
          </span>
          <div>
            <small>{t.paymentNoteSmall}</small>
            <strong>{t.paymentNoteTitle}</strong>
            <span>{t.paymentNoteText}</span>
          </div>
          <span className="note-arrow">↗</span>
        </div>
        <span className="location-tag">
          <Icon name="pin" /> {t.paymentLocation}
        </span>
      </div>
    </section>
  );
};

export default Payments;
