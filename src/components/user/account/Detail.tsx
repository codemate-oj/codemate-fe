"use client";
import { Table, TableProps } from "antd";
import React from "react";

const tableColumns: TableProps["columns"] = [
  {
    title: "交易时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "交易内容",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "交易类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "剩余魅值",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
  },
];

// const data: any = [
//   {
//     time:'',
//     content: '',
//     type: '',
//     value: '',
//     remark: ''
//   }
// ]

const Detail = () => {
  return (
    <Table
      rowKey="id"
      // dataSource={data}
      className="custom-antd-table"
      columns={tableColumns}
    />
  );
};

export default Detail;
