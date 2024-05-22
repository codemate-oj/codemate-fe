"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

// Ensure that MonacoEnvironment is configured correctly
if (typeof window !== "undefined") {
  self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
      if (label === "json") {
        return "_next/static/json.worker.js";
      }
      if (label === "css" || label === "scss" || label === "less") {
        return "_next/static/css.worker.js";
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return "_next/static/html.worker.js";
      }
      if (label === "typescript" || label === "javascript") {
        return "_next/static/ts.worker.js";
      }
      return "_next/static/editor.worker.js";
    },
  };
}

const CodeEditor = ({ langs }: { langs: string[] }) => {
  const [code, setCode] = useState<string>(() => {
    return localStorage.getItem("code") || "// Write your code here";
  });

  // console.log(pType, "类型");

  useEffect(() => {
    try {
      localStorage.setItem("code", code);
    } catch (error) {
      console.error("Error saving code to localStorage:", error);
    }
  }, [code]);

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode);
    }
  };

  //关于lang
  const availableLangs: Record<string, string> = {
    "cc.cc14o2": "C++",
    "py.py3": "Python",
  };

  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const handleButtonClick = (lang: string) => {
    setSelectedLang(lang);
  };

  console.log(langs, "输入");

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
              onClick={() => handleButtonClick(lang)}
            >
              {availableLangs[lang as keyof typeof availableLangs]} {/* 使用类型断言 */}
            </Button>
          ))}
        </div>
        <Editor
          height="30vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          value={code}
          onChange={(value) => handleCodeChange(value)}
          options={{
            tabSize: 2,
            insertSpaces: true,
          }}
          onMount={(editor, monaco) => {
            console.log("Editor mounted", editor, monaco);
          }}
          onValidate={(markers) => {
            console.log("Markers: ", markers);
          }}
        />
      </div>{" "}
    </>
  );
};

export default CodeEditor;
