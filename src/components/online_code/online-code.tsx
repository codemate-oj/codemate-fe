"use client";

import { Button, Divider, Radio, RadioChangeEvent } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import "allotment/dist/style.css";
import ResultTab from "@/components/online_code/result-tab";
import { request } from "@/lib/request";
import { usePathname } from "next/navigation";
import CodeEditor from "@/components/online_code/code-editor";
import SubmitRecord from "@/components/online_code/submit-record";
import QuestionDetail from "@/components/online_code/question-detail";

interface OnlineCodeProps {
  toggleOnlineCodeVisibility: () => void;
}

const OnlineCode: React.FC<OnlineCodeProps> = ({ toggleOnlineCodeVisibility }) => {
  const pathname = usePathname();
  const pid = pathname.split("/").pop();

  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState("//lang: c++");
  const [input, setInput] = useState("");
  const [selfRid, setSelfRid] = useState("");
  const [rid, setRid] = useState("");
  const [updateRecord, setUpdateRecord] = useState(0);

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
    const lang = selectedLanguage === "cpp" ? "cc.cc14o2" : selectedLanguage === "python" ? "py.py3" : "_";
    const { data } = await request.post(
      `/p/${pid}/submit` as "/p/{pid}/submit",
      { lang, code, input },
      {
        transformData: (data) => {
          return data;
        },
      }
    );
    setSelfRid(data.rid ?? "");
    setUpdateRecord(updateRecord + 1);
  };

  const handleTest = async () => {
    const lang = selectedLanguage === "cpp" ? "cc.cc14o2" : selectedLanguage === "python" ? "py.py3" : "_";
    const { data } = await request.post(
      `/p/${pid}/submit` as "/p/{pid}/submit",
      { lang, code },
      {
        transformData: (data) => {
          return data;
        },
      }
    );
    setRid(data.rid ?? "");
    setUpdateRecord(updateRecord + 1);
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
        <Button className="mb-2 mr-2" onClick={handleSelfTest}>
          自测运行
        </Button>
      ),
    },
    {
      type: "default",
      content: (
        <Button className="mb-2 mr-2" onClick={handleTest}>
          提交评测
        </Button>
      ),
    },
    {
      type: "default",
      content: (
        <Button className="mb-2 mr-2" onClick={exit}>
          退出
        </Button>
      ),
    },
    {
      type: "select",
      options: ["C++", "Python"],
      onSelectedChange: (e: RadioChangeEvent) => {
        const value = e.target.value;
        const lang = value === "C++" ? "cpp" : value?.toLocaleLowerCase();
        setSelectedLanguage(lang);
        const lastCode = localStorage.getItem(`${pid}-${lang}`);
        setCode(lastCode ?? `//lang: ${value}`);
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 h-screen w-full bg-white">
      <div className="flex h-[10vh] w-full items-center justify-center">
        {onlineEditorHeader.map((item) => {
          switch (item.type) {
            case "default":
              return item.content;
          }
        })}
      </div>
      <Divider className="!m-0" />
      <div className="flex h-[90vh] w-full">
        <div className="w-[50%] p-6">
          <QuestionDetail />
        </div>
        <Divider type="vertical" className="!h-full" />
        <div className="w-[50%]">
          <div className="h-[70vh] flex-1">
            <ResultTab input={input} handleInput={handleInput} rid={rid} selfRid={selfRid}>
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
          <Divider className="!m-0" />
          <div className="flex h-[20vh] w-full justify-center">
            <SubmitRecord updateRecord={updateRecord} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCode;
