import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { renderLines } from "../../utilities/renderLines";
import FooterBadges from "./footerContent/FooterBadges";
import FooterLinks from "./footerContent/FooterLinks";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer section-pad">
      <div className="footer-top">
        <a className="wordmark" href="#home">
          <img src="/assets/logo-icon.png" alt="" width={30} height={30} />
          <span>OnePlan.</span>
        </a>
        <p>{renderLines(t.footerTagline)}</p>
        <FooterLinks />
      </div>
      <FooterBadges />
      <div className="footer-logo" aria-hidden="true">
        OnePlan<span>.</span>
      </div>
      <div className="footer-bottom">
        <span>
          © <span id="year">{year}</span> OnePlan Travel
        </span>
        <span>{t.footerSlogan}</span>
        <a href="#home">{t.backToTop}</a>
      </div>
    </footer>
  );
};

export default Footer;
