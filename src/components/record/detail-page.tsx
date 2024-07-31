"use client";
import type { components } from "@/types/schema";
import { Card } from "antd";
import React from "react";
import JudgeStatus from "./judge-status";
import { parseTemplate } from "@/lib/utils";
import TestCases from "./test-cases";
import useRealtimeRecordDetail from "@/hooks/useRecordDetailConn";

export type RecordDoc = components["schemas"]["Record"];

interface IProps {
  rid: string;
  defaultValue: RecordDoc;
}

const DetailPage: React.FC<IProps> = ({ defaultValue, rid }) => {
  const rdoc = useRealtimeRecordDetail(rid, defaultValue);

  if (!rdoc) {
    return null;
  }
  return (
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
  );
};

export default DetailPage;
