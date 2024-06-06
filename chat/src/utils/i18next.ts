import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "locales/ru.json";

i18next.use(initReactI18next).init({
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru,
  },
});

export default i18next;
