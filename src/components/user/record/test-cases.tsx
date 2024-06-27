"use client";
import { Table, TableProps } from "antd";
import React from "react";
import JudgeStatus from "./judge-status";
import { parseTemplate } from "@/lib/utils";

export interface TestCaseType {
  id?: number;
  subtaskId?: number;
  score?: number;
  time: number;
  memory: number;
  status: number;
  message:
    | string
    | {
        message: string;
        params: string[];
      };
}

interface IProps {
  testCases: TestCaseType[];
}

const tableColumns: TableProps<TestCaseType>["columns"] = [
  { title: "#", render: (_, __, i) => `#${i}` },
  {
    title: "状态",
    render: (_, record) => (
      <div className="flex space-x-2">
        <JudgeStatus statusCode={record.status} score={record.score} />
        <div>
          {typeof record.message === "string"
            ? record.message
            : parseTemplate(record.message.message, record.message.params)}
        </div>
      </div>
    ),
  },
  {
    title: "耗时",
    dataIndex: "time",
    render: (value) => `${value} ms`,
  },
  {
    title: "内存占用",
    dataIndex: "memory",
    render: (value) => `${value} Bytes`,
  },
];

const TestCases: React.FC<IProps> = ({ testCases = [] }) => {
  return <Table rowKey="id" columns={tableColumns} dataSource={testCases} pagination={false} bordered></Table>;
};

export default TestCases;
