import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "../../../hooks/useLanguage";

interface Props {
  variant?: "desktop" | "mobile";
  onClick?: () => void;
}

const Language: React.FC<Props> = ({ variant = "desktop", onClick }) => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const nextLocale = locale === "vi" ? "en" : "vi";

  if (variant === "mobile") {
    return (
      <Link href={router.asPath} locale={nextLocale}>
        <a lang={nextLocale} onClick={onClick}>
          {t.switchLanguageMobile}
        </a>
      </Link>
    );
  }

  return (
    <Link href={router.asPath} locale={nextLocale}>
      <a
        className="site-language"
        lang={nextLocale}
        aria-label={t.switchLanguageAria}
      >
        {t.switchLanguageShort}
      </a>
    </Link>
  );
};

export default Language;
