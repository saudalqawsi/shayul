import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);
export const useI18n = () => useContext(LanguageContext);

const LS_KEY = "shayul_lang";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toArabicDigits(str) {
  return String(str).replace(/[0-9]/g, (d) => AR_DIGITS[d]);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ar";
    return localStorage.getItem(LS_KEY) || "ar";
  });

  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem(LS_KEY, lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const num = (n) => {
    const formatted = Number(n).toLocaleString("en-US");
    return lang === "ar" ? toArabicDigits(formatted) : formatted;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, dir, num }}>
      {children}
    </LanguageContext.Provider>
  );
}