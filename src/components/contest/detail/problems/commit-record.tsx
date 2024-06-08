"use client";
import { getTimeDiffFromNow } from "@/lib/utils";
import { Table, TableProps } from "antd";
import Link from "next/link";
interface DataType {
  key: string;
  status: string;
  title: string;
  last_commit: number | string;
}
interface CommitRecordProps {
  records: {
    key: string;
    status: string;
    last_commit: number | string;
    title: string;
  }[];
}
const columns: TableProps<DataType>["columns"] = [
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 180,
    align: "center",
  },
  {
    title: "最后提交于",
    dataIndex: "last_commit",
    key: "last_commit",
    width: 180,
    align: "center",
    render: (_, record) => {
      if (record.last_commit == "-") return <span>-</span>;
      const time = new Date(record.last_commit);
      if (time) return <span>{getTimeDiffFromNow(time) || "-"}</span>;
    },
  },
  {
    title: "题目",
    dataIndex: "title",
    key: "title",
    render: (_, record) => {
      return (
        <Link target="_blank" href={"/"} className="text-[rgb(255,125,55)]">
          {record.title}
        </Link>
      );
    },
  },
];

const CommitRecord: React.FC<CommitRecordProps> = (props) => {
  const { records } = props;

  return (
    <div>
      <h1 className="px-4 pt-4 font-light text-2xl text-[rgb(255,125,55)] pb-6">【提交记录】</h1>
      {<Table dataSource={records} columns={columns} pagination={false}></Table>}
    </div>
  );
};
export default CommitRecord;
