"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeLangContext, AVAILABLE_LANG_MAP } from "@/providers/code-lang-provider";
import { Textarea } from "../ui/textarea";

interface CodeInputProps {
  pid?: string;
  langs: string[];
}

const CodeInput: React.FC<CodeInputProps> = ({ langs, pid }) => {
  const [code, setCode] = useState<string>("");
  const { lang: selectedLang, setLang: setSelectedLang } = useContext(CodeLangContext);
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

  const handleLangChange = (newLang: string) => {
    setSelectedLang(newLang);
  };

  return (
    <>
      <div className="flex flex-col">
        <span className="text-2xl font-bold my-4">请答题</span>
        <span className="text-gray-500 mb-4">选择编译器</span>
        <div className="mb-4">
          {langs.map((lang) => (
            <Button
              key={lang}
              variant={"outline"}
              className={`mr-2 mb-2 justify-start  ${selectedLang === lang ? "border-primary border-2  text-primary hover:text-primary  mr-2 hover:bg-accent/30" : ""}`}
              onClick={() => handleLangChange(lang)}
            >
              {AVAILABLE_LANG_MAP[lang]}
            </Button>
          ))}
        </div>
        <Textarea className="mb-8 pr-4 min-h-[500px]" value={code} onChange={(e) => handleCodeChange(e.target.value)} />
      </div>
    </>
  );
};

export default CodeInput;
