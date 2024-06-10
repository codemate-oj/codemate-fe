"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { Button, Divider, Radio, RadioChangeEvent, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import "allotment/dist/style.css";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as cppLanguage } from "monaco-editor/esm/vs/basic-languages/cpp/cpp.js";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as pythonLanguage } from "monaco-editor/esm/vs/basic-languages/python/python.js";
import { languages } from "monaco-editor";
import ResultTab from "@/components/online_code/result-tab";

const OnlineCode = () => {
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
      type: "default",
      label: "自测运行",
    },
    {
      type: "default",
      label: "递交评测",
    },
    {
      type: "default",
      label: "退出",
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
  ];

  return (
    <>
      <div className="w-full h-screen fixed inset-0 z-50 bg-white">
        <div className="w-full flex h-[10vh] items-center justify-center">
          {onlineEditorHeader.map((item) => {
            switch (item.type) {
              case "default":
                return (
                  <Button key={item.label} className="mr-2 mb-2">
                    {item.label}
                  </Button>
                );
            }
          })}
        </div>
        <Divider className="!m-0" />
        <div className="w-full flex h-[80vh]">
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
                }
              })}
              <Editor language={selectedLanguage} value={code} loading={<Spin />} />
            </ResultTab>
          </div>
        </div>
        <Divider className="!m-0" />
        <div className="w-full flex h-[10vh]"></div>
      </div>
    </>
  );
};

export default OnlineCode;
