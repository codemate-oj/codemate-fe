"use client";
import React from "react";

export const AVAILABLE_LANG_MAP: Record<string, string> = {
  "cc.cc14o2": "C++",
  "py.py3": "Python",
};

export const CodeLangContext = React.createContext<{ lang: string; setLang: (lang: string) => void }>({
  lang: "cc.cc14o2",
  setLang: () => {},
});

const CodeLangProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLang] = React.useState("");
  return <CodeLangContext.Provider value={{ lang, setLang }}>{children}</CodeLangContext.Provider>;
};

export default CodeLangProvider;
