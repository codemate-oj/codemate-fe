"use client";

import { Button, Divider, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import "allotment/dist/style.css";
import ResultTab from "@/components/online_code/result-tab";
import { request } from "@/lib/request";
import { usePathname } from "next/navigation";
import CodeEditor from "@/components/online_code/code-editor";

interface OnlineCodeProps {
  toggleOnlineCodeVisibility: () => void;
}

const OnlineCode: React.FC<OnlineCodeProps> = ({ toggleOnlineCodeVisibility }) => {
  const pathname = usePathname();
  const pid = pathname.split("/").pop();

  const [selectedLanguage, setSelectedLanguage] = useState("c++");
  const [code, setCode] = useState("//lang: c++");
  const [input, setInput] = useState("");
  const [wsRid, setWsRid] = useState("");

  useEffect(() => {
    setInput(localStorage.getItem(`${pid}-self-test-input`) ?? "");
  }, [pid]);

  const handleCode = (code: string | undefined) => {
    setCode(code ?? "");
    localStorage.setItem(`${pid}-${selectedLanguage}`, code ?? "");
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    localStorage.setItem(`${pid}-self-test-input`, e.target.value ?? "");
  };

  const handleSelfTest = async () => {
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
        const lang = value?.toLocaleLowerCase();
        setSelectedLanguage(lang);
        const lastCode = localStorage.getItem(`${pid}-${lang}`);
        setCode(lastCode ?? `//lang: ${lang}`);
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
            <ResultTab input={input} handleInput={handleInput} output={""} wsRid={wsRid}>
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
              <CodeEditor selectedLanguage={selectedLanguage} code={code} handleCode={handleCode} />
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
