import { useRouter } from "next/router";
import translationEn from "../../locales/en";
import translationRu from "../../locales/ru";
import translationUa from "../../locales/ua";

const useTranslateText = () => {
  const router = useRouter();
  const { locale } = router;
  const text =
    locale === "en-US"
      ? translationEn
      : locale === "ru-RU"
      ? translationRu
      : translationUa
  return text;
};

export default useTranslateText;
