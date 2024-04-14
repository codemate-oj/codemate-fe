"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { Button, Select } from "antd";
import clsx from "clsx";
import { useState } from "react";

const Page = () => {
  const editorInstance = useMonaco();
  const [selectedLanguage, setSelectedLanguage] = useState("typescript");
  const [code, setCode] = useState("//lang: typescript");
  const onlineEditorHeader: {
    label?: string;
    type?: "default" | "select";
    options?: string[];
    onSelectedChange?: (value: string) => void;
  }[] = [
    {
      label: "运行自测(F9)",
    },
    {
      label: "递交评测(F10)",
    },
    {
      label: "退出(Alt+Q)",
    },
    {
      type: "select",
      options: [
        "TypeScript",
        "JavaScript",
        "CSS",
        "LESS",
        "SCSS",
        "JSON",
        "HTML",
        "XML",
        "PHP",
        "C#",
        "C++",
        "Razor",
        "Markdown",
        "Java",
        "VB",
        "CoffeeScript",
        "Handlebars",
        "Batch",
        "Pug",
        "F#",
        "Lua",
        "Powershell",
        "Python",
        "Ruby",
        "SASS",
        "R",
        "Objective-C",
      ],
      onSelectedChange: (value) => {
        if (!editorInstance) return;
        const lang = value?.toLocaleLowerCase();
        setSelectedLanguage(lang);
        setCode(`//lang: ${lang}`);
      },
    },
    {
      label: "自测",
    },
    {
      label: "评测记录",
    },
  ];
  return (
    <>
      <div className="w-full flex">
        <div className="w-[50%] h-32"></div>
        <div className="flex-1 h-32">
          {onlineEditorHeader.map((item, index) => {
            const className = "mr-2 mb-2";
            switch (item.type) {
              case "select":
                return (
                  <div className={clsx(className, "inline-block")} key={index}>
                    <Select
                      style={{ width: 120 }}
                      defaultValue={item?.options?.[0]}
                      onChange={item.onSelectedChange}
                      options={item?.options?.map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                  </div>
                );
              default:
                return (
                  <Button key={index} className={className}>
                    {item.label}
                  </Button>
                );
            }
          })}
          {<Editor height="90vh" defaultLanguage={selectedLanguage} value={code} />}
        </div>
      </div>
    </>
  );
};
export default Page;
