import { EXTERNAL_SITE } from "../lib/config";

// Link tới các trang con trên site gốc, có prefix /vi khi đang ở tiếng Việt
export const externalHref = (path: string, locale?: string) => {
  const prefix = locale === "vi" ? "/vi" : "";
  return `${EXTERNAL_SITE}${prefix}${path}`;
};
