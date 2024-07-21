"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AVAILABLE_LANG_MAP, useCodeLangContext, LangType } from "@/providers/code-lang-provider";
import { Textarea } from "../ui/textarea";

interface CodeInputProps {
  pid?: string;
  langs: LangType[];
}

const CodeInput: React.FC<CodeInputProps> = ({ langs, pid }) => {
  const [code, setCode] = useState<string>("");
  const { lang: selectedLang, setLang: setSelectedLang } = useCodeLangContext();
  const cacheKey = useRef(`code-${pid}`);

  // 初始化
  useEffect(() => {
    const cachedCode = localStorage.getItem(cacheKey.current);
    if (cachedCode) {
      setCode(cachedCode);
    }
  }, []);

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode);
      localStorage.setItem(cacheKey.current, newCode);
    }
  };

  const handleLangChange = (newLang: LangType) => {
    setSelectedLang(newLang);
  };

  return (
    <>
      <div className="flex flex-col">
        <span className="my-4 text-2xl font-bold">请答题</span>
        <span className="mb-4 text-gray-500">选择编译器</span>
        <div className="mb-4">
          {langs.map((lang) => (
            <Button
              key={lang}
              variant={"outline"}
              className={`mb-2 mr-2 justify-start ${selectedLang === lang ? "mr-2 border-2 border-primary text-primary hover:bg-accent/30 hover:text-primary" : ""}`}
              onClick={() => handleLangChange(lang)}
            >
              {AVAILABLE_LANG_MAP[lang as LangType]}
            </Button>
          ))}
        </div>
        <Textarea className="mb-8 min-h-[500px] pr-4" value={code} onChange={(e) => handleCodeChange(e.target.value)} />
      </div>
    </>
  );
};

export default CodeInput;
