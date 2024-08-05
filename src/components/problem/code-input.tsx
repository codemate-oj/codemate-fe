"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AVAILABLE_LANG_MAP, LangType } from "@/providers/code-lang-provider";
import { Textarea } from "../ui/textarea";
import { debounce } from "lodash";
import { toast } from "sonner";

interface CodeInputProps {
  pid?: string | number;
  langs: LangType[];
  onChange?: (lang: LangType, code: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ langs, pid, onChange }) => {
  const [code, setCode] = useState<string>("");
  const [lang, setLang] = useState<LangType | undefined>(langs[0]);

  const cacheKeyPrefix = useRef(`code-${pid}`);
  const getCacheKey = () => `${cacheKeyPrefix.current}-${lang}`;

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode);
      localStorage.setItem(cacheKeyPrefix.current, newCode); // TODO: 用于代码提交 提取到context中
      localStorage.setItem(getCacheKey(), newCode);
    }
  };

  const handleLangChange = (newLang: LangType) => {
    setLang(newLang);
  };

  useEffect(() => {
    const cachedCode = localStorage.getItem(getCacheKey());
    if (cachedCode) {
      setCode(cachedCode);
    }
  }, [lang]);

  useEffect(() => {
    if (!lang) {
      toast.error("请选择语言");
      return;
    }
    onChange?.(lang, code);
  }, [lang, code]);

  return (
    <>
      <div className="flex flex-col">
        <span className="my-4 text-2xl font-bold">请答题</span>
        <span className="mb-4 text-gray-500">选择编译器</span>
        <div className="mb-4">
          {langs.map((l) => (
            <Button
              key={l}
              variant={"outline"}
              className={`mb-2 mr-2 justify-start ${lang === l ? "mr-2 border-2 border-primary text-primary hover:bg-accent/30 hover:text-primary" : ""}`}
              onClick={() => handleLangChange(l)}
            >
              {AVAILABLE_LANG_MAP[l as LangType]}
            </Button>
          ))}
        </div>
        <Textarea
          className="mb-8 min-h-[500px] pr-4"
          value={code}
          onChange={(e) => {
            debounce(() => handleCodeChange(e.target.value), 500)();
          }}
        />
      </div>
    </>
  );
};

export default CodeInput;
