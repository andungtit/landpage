import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../../lib/config";
import Icon from "./Icon";

const StoreButtons = () => {
  const { t } = useLanguage();
  return (
    <div className="store-row">
      <a className="app-store" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
        <span className="apple-logo"></span>
        <span>
          <small>{t.appStoreSmall}</small>App Store
        </span>
        <Icon name="arrow" />
      </a>
      <a className="app-store" href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
        <span className="play-logo"></span>
        <span>
          <small>{t.googlePlaySmall}</small>Google Play
        </span>
        <Icon name="arrow" />
      </a>
    </div>
  );
};

export default StoreButtons;
