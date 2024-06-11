"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { Button, Divider, Radio, RadioChangeEvent, Spin } from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "allotment/dist/style.css";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as cppLanguage } from "monaco-editor/esm/vs/basic-languages/cpp/cpp.js";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as pythonLanguage } from "monaco-editor/esm/vs/basic-languages/python/python.js";
import { languages } from "monaco-editor";
import ResultTab from "@/components/online_code/result-tab";
import { request } from "@/lib/request";
import { usePathname } from "next/navigation";

interface OnlineCodeProps {
  toggleOnlineCodeVisibility: () => void;
}

const OnlineCode: React.FC<OnlineCodeProps> = ({ toggleOnlineCodeVisibility }) => {
  const pathname = usePathname();
  const editorInstance = useMonaco();

  const [selectedLanguage, setSelectedLanguage] = useState("c++");
  const [code, setCode] = useState("//lang: c++");
  const [input, setInput] = useState("");
  const [wsRid, setWsRid] = useState("");

  const handleCode = (code: string | undefined) => {
    setCode(code ?? "");
  };

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

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSelfTest = async () => {
    const pid = pathname.split("/").pop();
    const lang = selectedLanguage === "c++" ? "cc.cc14o2" : selectedLanguage === "python" ? "py.py3" : "_";
    const { data } = await request.post(
      `/p/${pid}/submit` as "/p/{pid}/submit",
      { lang, code, input },
      {
        transformData: (data) => {
          return data;
        },
      }
    );
    setWsRid(data.rid ?? "");
  };

  const handleTest = async () => {
    const pid = pathname.split("/").pop();
    const lang = selectedLanguage === "c++" ? "cc.cc14o2" : selectedLanguage === "python" ? "py.py3" : "_";
    const { data } = await request.post(
      `/p/${pid}/submit` as "/p/{pid}/submit",
      { lang, code: code },
      {
        transformData: (data) => {
          return data;
        },
      }
    );
    setWsRid(data.rid ?? "");
  };

  const exit = () => {
    toggleOnlineCodeVisibility();
  };

  const onlineEditorHeader: {
    type?: "default" | "select";
    content?: React.ReactNode;
    options?: string[];
    onSelectedChange?: (e: RadioChangeEvent) => void;
  }[] = [
    {
      type: "default",
      content: (
        <Button className="mr-2 mb-2" onClick={handleSelfTest}>
          自测运行
        </Button>
      ),
    },
    {
      type: "default",
      content: (
        <Button className="mr-2 mb-2" onClick={handleTest}>
          提交评测
        </Button>
      ),
    },
    {
      type: "default",
      content: (
        <Button className="mr-2 mb-2" onClick={exit}>
          退出
        </Button>
      ),
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
                return item.content;
            }
          })}
        </div>
        <Divider className="!m-0" />
        <div className="w-full flex h-[80vh]">
          <div className="w-[50%]"></div>
          <Divider type="vertical" className="!h-full" />
          <div className="flex-1">
            <ResultTab handleInput={handleInput} output={""} wsRid={wsRid}>
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
              <Editor language={selectedLanguage} value={code} loading={<Spin />} onChange={handleCode} />
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
