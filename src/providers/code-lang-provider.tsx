"use client";
import React, { useContext } from "react";

export type langType = "cc.cc14o2" | "py.py3" | "scratch" | "_";

interface langContextType {
  lang: langType;
  setLang: React.Dispatch<React.SetStateAction<langType>>;
}
export const AVAILABLE_LANG_MAP: Record<langType, string> = {
  "cc.cc14o2": "C++",
  "py.py3": "Python",
  scratch: "",
  _: "",
};

export const CodeLangContext = React.createContext<langContextType | undefined>(undefined);

const CodeLangProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLang] = React.useState<langType>("cc.cc14o2");
  return <CodeLangContext.Provider value={{ lang, setLang }}>{children}</CodeLangContext.Provider>;
};

export const useCodeLangContext = (): langContextType => {
  const context = useContext(CodeLangContext);
  if (context == undefined) throw new Error("");
  return context;
};

export default CodeLangProvider;
