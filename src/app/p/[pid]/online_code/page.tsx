"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { Collapse, Divider, Radio, RadioChangeEvent, Spin, Tabs } from "antd";
import { useRef, useState } from "react";
import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";

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
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState("//lang: cpp");
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
      options: ["CPP", "Python"],
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
  const [position, setPosition] = useState<string>("50%");
  const paneRef = useRef<AllotmentHandle>(null);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const handleCollapse = (keys: string | string[]) => {
    if (isCollapsed) {
      if (paneRef.current) paneRef.current.resize([9, 1]);
    } else {
      if (paneRef.current) paneRef.current.reset();
    }
    setIsCollapsed(keys.length !== 0);
  };
  const handlePositionChange = (position: number[]) => {
    setPosition(`${(position[1] / (position[0] + position[1])) * 100}%`);
  };
  const collapseItem = [
    {
      // key: "1",
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
              <Editor language={selectedLanguage} value={code} loading={<Spin />} className="" />
            </Allotment.Pane>
            <Allotment.Pane preferredSize={position} className="duration-300 ease-in-out">
              <Collapse
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
