import { getTimeDiffFromNow } from "@/lib/utils";
import { Table, TableProps } from "antd";
import Link from "next/link";
import JudgeStatus from "@/components/record/judge-status";
interface DataType {
  key: string;
  status: string | number;
  title: string;
  last_commit: number | string;
  score: number;
  pid: string;
  tid: string;
}
interface CommitRecordProps {
  records: {
    key: string;
    status: string | number;
    score: number;
    last_commit: number | string;
    title: string;
    pid: string;
    tid: string;
  }[];
}
const columns: TableProps<DataType>["columns"] = [
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 180,
    align: "center",
    render: (_, record) => {
      if (typeof record.status === "string") return record.status;
      return <JudgeStatus statusCode={record.status} score={record.score} />;
    },
  },
  {
    title: "最后提交于",
    dataIndex: "last_commit",
    key: "last_commit",
    width: 180,
    align: "center",
    render: (_, record) => {
      if (!record.last_commit || record.last_commit == "-") return <span>-</span>;
      return <span>{getTimeDiffFromNow(new Date(record.last_commit))}</span>;
    },
  },
  {
    title: "题目",
    dataIndex: "title",
    key: "title",
    render: (_, record) => {
      return (
        <Link
          target="_blank"
          href={`/p/${record.pid}?tid=${record.tid}&fromContest=true`}
          className="text-[rgb(255,125,55)]"
        >
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
      <h1 className="px-4 pb-6 pt-4 text-2xl font-light text-[rgb(255,125,55)]">【提交记录】</h1>
      <Table dataSource={records} columns={columns} pagination={false}></Table>
    </div>
  );
};
export default CommitRecord;
