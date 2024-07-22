import React from "react";
import { Table, Divider } from "antd";

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
