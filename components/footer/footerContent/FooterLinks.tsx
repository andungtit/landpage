import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "../../../hooks/useLanguage";
import { IFooterLink } from "../../../lib/types/content";
import { footerLinks } from "../../../mock/footer";
import { externalHref } from "../../../utilities/externalHref";

const FooterLinks = () => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const nextLocale = locale === "vi" ? "en" : "vi";

  return (
    <div className="footer-links">
      {(footerLinks as IFooterLink[]).map((item) => (
        <a key={item.href} href={externalHref(item.href, locale)}>
          {t[item.title]}
        </a>
      ))}
      <Link href={router.asPath} locale={nextLocale}>
        <a lang={nextLocale}>{t.switchLanguageMobile}</a>
      </Link>
    </div>
  );
};

export default FooterLinks;
