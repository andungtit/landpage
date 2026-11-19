import { useRouter } from "next/router";
import en from "../locales/en";
import vi from "../locales/vi";

const translations = {
  en,
  vi,
};

export const useLanguage = () => {
  const { locale } = useRouter();
  const t = translations[locale as keyof typeof translations] ?? en;

  return {
    t,
    locale,
  };
};
