"use client";
import type { components } from "@/types/schema";
import { Button, Card } from "antd";
import React, { useMemo } from "react";
import JudgeStatus from "./judge-status";
import { getScoreColor, getTimeDiffFromNow, parseTemplate } from "@/lib/utils";
import TestCases from "./test-cases";
import useRealtimeRecordDetail from "@/hooks/useRecordDetailConn";
import Link from "next/link";
import { DownloadOutlined } from "@ant-design/icons";
import SyntaxHighlighter from "react-syntax-highlighter";

export type RecordDoc = components["schemas"]["Record"];

interface IProps {
  rid: string;
  defaultValue: RecordDoc & { submitAt?: Date };
  udoc?: components["schemas"]["User"];
  pdoc?: components["schemas"]["Problem"];
}

const DetailPage: React.FC<IProps> = ({ defaultValue: { submitAt, ...defaultValue }, rid, udoc, pdoc }) => {
  const rdoc = useRealtimeRecordDetail(rid, defaultValue);

  const { code, lang } = useMemo(() => {
    const LANG_MAP = {
      "cc.cc14o2": "cpp",
      "py.py3": "python",
      _: "yaml",
    };
    return {
      lang: LANG_MAP[rdoc?.lang as keyof typeof LANG_MAP] ?? "yaml",
      code: rdoc?.code,
    };
  }, [defaultValue?.code, defaultValue?.lang]);

  if (!rdoc) {
    return null;
  }
  return (
    <>
      <div className="flex flex-wrap justify-around bg-[#F9F9F9] py-1.5 text-[#797979]">
        {udoc && (
          <div>
            <span>递交者: </span>
            <span>{udoc?.uname}</span>
          </div>
        )}
        {pdoc && (
          <div>
            <span>题目：</span>
            <Link href={`/p/${pdoc.pid}`} target="_blank" className="hover:underline">
              {pdoc.pid} - {pdoc.title}
            </Link>
          </div>
        )}
        {submitAt && (
          <div>
            <span>递交时间：</span>
            <span>{getTimeDiffFromNow(submitAt)}</span>
          </div>
        )}
        <div>
          <span>分数: </span>
          <span style={{ color: getScoreColor(rdoc.score) }}>{rdoc.score}</span>
        </div>
      </div>
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
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-5">
          <h2 className="text-lg text-[#ff7d37]">【代码】</h2>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            onClick={() => {
              window.open(`https://api.aioj.net/record/${rid}?download=true`, "_blank");
            }}
          >
            代码下载
          </Button>
        </div>
        <div>
          {rdoc.lang === "scratch" ? (
            <p className="py-5 text-center text-gray-400">Scratch语言暂不支持预览</p>
          ) : (
            code && (
              <div className="my-5">
                <SyntaxHighlighter showLineNumbers={true} language={lang} wrapLines={true}>
                  {code}
                </SyntaxHighlighter>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPage;
