// src/i18n.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import multiLangResource from "./multiLangResource";

i18n.use(initReactI18next).init({
  resources: multiLangResource,
  lng: "english",
  fallbackLng: "marathi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
