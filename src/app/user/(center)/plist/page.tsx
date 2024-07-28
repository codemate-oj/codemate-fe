"use client";
import React from "react";
import Image from "next/image";
import { Table, Divider, TableProps } from "antd";
import Link from "next/link";

interface ProblemList {
  key: string;
  title: string;
  content?: string;
  pids: number[];
  assign?: string[];
  visibility?: "private" | "public" | "system";
  children?: number[];
  description?: string;
}

const dataSource: ProblemList[] = [
  {
    key: "1",
    title: "zono精选",
    pids: [1, 2, 3],
    description: "西湖区湖底公园1号",
  },
  {
    key: "2",
    title: "nope精选",
    pids: [4, 5, 6, 7],
    description: "西湖区湖底公园2号",
  },
  {
    key: "3",
    title: "nope精选2",
    pids: [2],
    description: "西湖区湖底公园3号",
  },
];

const columns: TableProps<ProblemList>["columns"] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "pids",
    key: "pids",
    render: (_, { pids }) => <span className="text-sm text-[#FF7D37]">{`${pids.length} 道`}</span>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },

  {
    title: "Action",
    key: "action",
    render: () => (
      <Link href={"/user/plist/detail"}>
        <Image src="/svg/app-user-plist-editIcon.svg" alt="editQuiz" width={20} height={24} />
      </Link>
    ),
  },
];

const UserProblemListPage: React.FC = () => {
  return (
    <div>
      <Divider />
      <Table showHeader={false} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default UserProblemListPage;
