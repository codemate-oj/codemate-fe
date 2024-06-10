"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { Collapse, Divider, Radio, RadioChangeEvent, Spin, Tabs } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as cppLanguage } from "monaco-editor/esm/vs/basic-languages/cpp/cpp.js";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as pythonLanguage } from "monaco-editor/esm/vs/basic-languages/python/python.js";
import { languages } from "monaco-editor";

const tabList = [
  { key: "tab1", label: "自测结果" },
  { key: "tab2", label: "评测结果" },
];
const contentList: Record<string, React.ReactNode> = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

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

  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState<string>("");
  const [position, setPosition] = useState<string>("50%");
  const paneRef = useRef<AllotmentHandle>(null);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const handleCollapse = (keys: string | string[]) => {
    if (keys.length) {
      setCollapseKey("result");
    } else {
      setCollapseKey("");
    }
    if (isCollapsed) {
      if (paneRef.current) paneRef.current.resize([9, 1]);
    } else {
      if (paneRef.current) paneRef.current.reset();
    }
    setIsCollapsed(Boolean(keys.length));
  };
  const handlePositionChange = (position: number[]) => {
    if (position[1] / (position[0] + position[1]) > 0.1) {
      setCollapseKey("result");
    } else {
      setCollapseKey("");
    }
    setPosition(`${(position[1] / (position[0] + position[1])) * 100}%`);
  };
  const collapseItem = [
    {
      key: "result",
      label: <Tabs activeKey={activeTabKey} items={tabList} onChange={onTabChange} />,
      children: contentList[activeTabKey],
    },
  ];
  return (
    <>
      <div className="w-full flex h-[90vh]">
        <div className="w-[50%]"></div>
        <Divider type="vertical" className="!h-full" />
        <div className="flex-1">
          <Allotment vertical defaultSizes={[9, 1]} ref={paneRef} onDragEnd={handlePositionChange}>
            <Allotment.Pane minSize={200} className="duration-300 ease-in-out">
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
            </Allotment.Pane>
            <Allotment.Pane preferredSize={position} className="duration-300 ease-in-out">
              <Collapse
                activeKey={collapseKey}
                items={collapseItem}
                collapsible="icon"
                expandIconPosition="end"
                onChange={handleCollapse}
                className="!my-2 !mr-3"
                ghost
              />
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
    </>
  );
};
export default Page;
