"use client";
import type { components } from "@/types/schema";
import { Card } from "antd";
import React, { Suspense } from "react";
import JudgeStatus from "./judge-status";
import { parseTemplate } from "@/lib/utils";
import TestCases from "./test-cases";
import useRealtimeRecordDetail from "@/hooks/useRecordDetailConn";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import RecordUserTab, { RdocType } from "./record-user-tab";

export type RecordDoc = components["schemas"]["Record"];

interface IProps {
  rid?: string;
  defaultValue: RecordDoc;
  uname?: string;
  pid?: string;
  title?: string;
  subtime?: string;
}

const MarkdownRenderer = React.lazy(() => import("@/components/common/markdown-renderer"));

const DetailPage: React.FC<IProps> = ({ defaultValue, rid, uname, pid, title, subtime }) => {
  const rdoc = useRealtimeRecordDetail(rid, defaultValue);

  function parseCode(code: string, lang: string): string {
    return "```" + (lang === "cc.cc14o2" ? "cpp" : "python") + code;
  }

  const downloadCode = async (code: string) => {
    const blob: Blob = new Blob([code], { type: "text/plain" });
    const link: HTMLAnchorElement = document.getElementById("downloadLink") as HTMLAnchorElement;
    link.href = URL.createObjectURL(blob);
    link.download = "download.cc";
    link.click();
  };

  if (!rdoc) {
    return null;
  }

  const rudocData: RdocType = {
    pid: pid,
    uname: uname,
    score: rdoc.score,
    title: title,
    subtime: subtime,
  };

  return (
    <>
      <RecordUserTab data={rudocData} />
      <div className="mt-5">
        <Card title={<JudgeStatus statusCode={rdoc.status} score={rdoc.score} />}>
          <h3 className="text-lg font-bold">评测详情</h3>
          <div className="my-5 text-fail">
            {rdoc.compilerTexts.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
            {rdoc.judgeTexts.map((item, index) => (
              <div key={index}>{typeof item === "string" ? item : parseTemplate(item.message, item.params ?? [])}</div>
            ))}
          </div>
          {rdoc.testCases.length > 0 && <TestCases rid={rdoc._id} testCases={rdoc.testCases} />}
        </Card>
        {defaultValue.code && (
          <div className="mt-4 pl-4">
            <h2 className="text-[#ff7d37]">【代码】</h2>
            <div className="mb-5 mt-4">
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                onClick={() => {
                  downloadCode(defaultValue.code);
                }}
              >
                代码下载
              </Button>
              <a id="downloadLink" href="#" download="example.cc" className="visible"></a>
            </div>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <MarkdownRenderer
                  markdown={parseCode(defaultValue.code, defaultValue.lang)}
                  className="prose-pdetail"
                />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
