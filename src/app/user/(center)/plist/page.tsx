import React from "react";
import { Table, Divider } from "antd";

// export interface ProblemList extends Document {
//   docId: ObjectId;
//   docType: typeof TYPE_PROBLEM_LIST;
//   title: string;
//   content: string;
//   // 题单功能
//   pids: number[];
//   assign?: string[];
//   visibility: "private" | "public" | "system"; // 控制题单可见性：该doc用于个人题单和系统题单
//   // 树状题单功能
//   parent: ObjectId | null;
//   children?: ObjectId[];
// }

// mock数据
const dataSource = [
  {
    key: "1",
    name: "zono精选",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "nope精选",
    age: 42,
    address: "西湖区湖底公园1号",
  },
  {
    key: "3",
    name: "nope精选2",
    age: 41,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    dataIndex: "name",
    key: "name",
  },
  {
    dataIndex: "age",
    key: "age",
  },
  {
    dataIndex: "address",
    key: "address",
  },
];

const UserProblemListPage = () => {
  return (
    <div>
      <Divider></Divider>
      <Table showHeader={false} dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default UserProblemListPage;
