import React, { useEffect } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import {
  APPLE_ITUNES_APP_ID,
  EXTERNAL_SITE,
  ONEPLAN_API_BASE,
} from "../../lib/config";
import { initSmoothScroll } from "../../lib/smoothScroll";
import store from "../../store/index";
import Footer from "../footer";
import Header from "../header";
import PlanDemo from "../planDemo";
import SvgLibrary from "../UI/SvgLibrary";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { t, locale } = useLanguage();
  const canonical =
    locale === "vi" ? `${EXTERNAL_SITE}/vi/` : `${EXTERNAL_SITE}/`;

  useEffect(() => {
    document.documentElement.lang = locale || "en";
  }, [locale]);

  useEffect(() => {
    return initSmoothScroll();
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="oneplan-api-base" content={ONEPLAN_API_BASE} />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="apple-itunes-app"
          content={`app-id=${APPLE_ITUNES_APP_ID}`}
        />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={`${EXTERNAL_SITE}/`} />
        <link rel="alternate" hrefLang="vi" href={`${EXTERNAL_SITE}/vi/`} />
        <meta property="og:title" content={t.ogTitle} />
        <meta property="og:description" content={t.ogDescription} />
        <meta
          property="og:image"
          content={`${EXTERNAL_SITE}/assets/Thumbnail.jpg`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <SvgLibrary />
      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>
      <Header />
      <main id="main">{children}</main>
      <PlanDemo />
      <Footer />
    </Provider>
  );
};

export default Layout;
