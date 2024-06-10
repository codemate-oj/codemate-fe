"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { Divider, Radio, RadioChangeEvent, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import "allotment/dist/style.css";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as cppLanguage } from "monaco-editor/esm/vs/basic-languages/cpp/cpp.js";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as pythonLanguage } from "monaco-editor/esm/vs/basic-languages/python/python.js";
import { languages } from "monaco-editor";
import ResultTab from "@/components/home/online_code/result-tab";

const Page = () => {
  const editorInstance = useMonaco();

  const [selectedLanguage, setSelectedLanguage] = useState("c++");
  const [code, setCode] = useState("//lang: c++");

  const registerLanguage = useCallback(
    (language: string, rule: languages.IMonarchLanguage) => {
      if (editorInstance) {
        editorInstance.languages.registerCompletionItemProvider(language, {
          provideCompletionItems: function (model, position) {
            const suggestions: languages.CompletionItem[] = [];
            // 获取当前单词的范围
            const word = model.getWordAtPosition(position);
            if (word) {
              const startLineNumber = position.lineNumber;
              const startColumn = word.startColumn;
              const endLineNumber = position.lineNumber;
              const endColumn = word.endColumn;

              // 确保单词范围有效
              const currentWordRange = new editorInstance.Range(startLineNumber, startColumn, endLineNumber, endColumn);

              rule.keywords.forEach((item: string) => {
                suggestions.push({
                  label: item,
                  kind: editorInstance.languages.CompletionItemKind.Keyword,
                  insertText: item,
                  range: currentWordRange,
                });
              });
              rule.operators?.forEach((item: string) => {
                suggestions.push({
                  label: item,
                  kind: editorInstance.languages.CompletionItemKind.Operator,
                  insertText: item,
                  range: currentWordRange,
                });
              });
            }
            return {
              suggestions: suggestions,
              incomplete: true,
            };
          },
        });
        editorInstance.languages.register({ id: language });
        editorInstance.languages.setMonarchTokensProvider(language, rule);
      }
    },
    [editorInstance]
  );

  useEffect(() => {
    switch (selectedLanguage) {
      case "c++":
        registerLanguage("c++", cppLanguage);
        break;
      case "python":
        registerLanguage("python", pythonLanguage);
        break;
      default:
        break;
    }
  }, [editorInstance, registerLanguage, selectedLanguage]);

  const onlineEditorHeader: {
    label?: string;
    type?: "default" | "select";
    options?: string[];
    onSelectedChange?: (e: RadioChangeEvent) => void;
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
      options: ["C++", "Python"],
      onSelectedChange: (e: RadioChangeEvent) => {
        const value = e.target.value;
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
      <div className="w-full flex h-[90vh]">
        <div className="w-[50%]"></div>
        <Divider type="vertical" className="!h-full" />
        <div className="flex-1">
          <ResultTab>
            {onlineEditorHeader.map((item, index) => {
              switch (item.type) {
                case "select":
                  return (
                    <div className="m-2 inline-block" key={index}>
                      选择语言&nbsp;
                      <Radio.Group onChange={item.onSelectedChange} defaultValue={item?.options?.[0]}>
                        {item?.options?.map((i) => (
                          <Radio.Button key={i} value={i}>
                            {i}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </div>
                  );
                // default:
                //   return (
                //     <Button key={index} className={className}>
                //       {item.label}
                //     </Button>
                //   );
              }
            })}
            <Editor language={selectedLanguage} value={code} loading={<Spin />} />
          </ResultTab>
        </div>
      </div>
    </>
  );
};
export default Page;
