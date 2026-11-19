import React from "react";
import { useLanguage } from "../../hooks/useLanguage";

interface Props {
  size?: number;
  withBrandDot?: boolean;
}

const Logo: React.FC<Props> = ({ size = 26, withBrandDot = true }) => {
  const { t } = useLanguage();
  return (
    <a className="wordmark" href="#home" aria-label={t.homeAria}>
      <img src="/assets/logo-icon.png" alt="" width={size} height={size} />
      <span>
        OnePlan
        {withBrandDot ? <span className="brand-dot">.</span> : "."}
      </span>
    </a>
  );
};

export default Logo;
