"use client";
import React from "react";
import { Divider } from "antd";
import ProblemListTable from "@/components/home/problem-list-table";
// interface ProblemList {
//   key: string;
//   title: string;
//   content?: string;
//   pids: number[];
//   assign?: string[];
//   visibility?: "private" | "public" | "system";
//   children?: number[];
//   description?: string;
// }

export interface requestType {
  /**
   * 仅管理员可用，显示所有用户的题单
   */
  all?: boolean;
  page?: number;
  [property: string]: unknown;
}

const UserProblemListPage: React.FC = () => {
  return (
    <div>
      <Divider />
      <ProblemListTable></ProblemListTable>;
    </div>
  );
};

export default UserProblemListPage;
