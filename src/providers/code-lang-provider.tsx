"use client";
import React, { useContext } from "react";

export type LangType = "cc.cc14o2" | "py.py3" | "scratch" | "_";

interface LangContextType {
  lang: LangType;
  setLang: React.Dispatch<React.SetStateAction<LangType>>;
}
export const AVAILABLE_LANG_MAP: Record<LangType, string> = {
  "cc.cc14o2": "C++",
  "py.py3": "Python",
  scratch: "",
  _: "",
};

export const CodeLangContext = React.createContext<LangContextType | undefined>(undefined);

const CodeLangProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLang] = React.useState<LangType>("cc.cc14o2");
  return <CodeLangContext.Provider value={{ lang, setLang }}>{children}</CodeLangContext.Provider>;
};

export const useCodeLangContext = (): LangContextType => {
  const context = useContext(CodeLangContext);
  if (context == undefined) throw new Error("");
  return context;
};

export default CodeLangProvider;
