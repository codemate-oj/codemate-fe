import { Table, TableProps } from "antd";
import Link from "next/link";
import { getTimeDiffFromNow } from "@/lib/utils";
import JudgeStatus from "@/components/record/judge-status";
import { PROGRAMMING_LANGS } from "@/constants/misc";
const columns: TableProps<DataType>["columns"] = [
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (_, record) => {
      return <JudgeStatus statusCode={Number(record.status)} score={record.score} />;
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
  // {
  //   title: "时间",
  //   dataIndex: "time",
  //   key: "time",
  //   render: (_, record) => {
  //     if (record.time == 0) return <span>-</span>;
  //     return <span>{record.time}ms</span>;
  //   },
  // },
  // {
  //   title: "内存",
  //   dataIndex: "memory",
  //   key: "memory",
  //   render: (_, record) => {
  //     if (record.memory == 0) return <span>-</span>;
  //     return <span>{record.memory}MiB</span>;
  //   },
  // },
  {
    title: "语言",
    dataIndex: "language",
    key: "language",
    render: (value) => PROGRAMMING_LANGS[value as keyof typeof PROGRAMMING_LANGS] ?? "-",
  },
  {
    title: "提交时间",
    dataIndex: "submitTime",
    key: "submitTime",
    render: (_, record) => {
      if (!record.last_commit || record.last_commit == "-") return <span>-</span>;
      return <span>{getTimeDiffFromNow(new Date(record.last_commit))}</span>;
    },
  },
];
type DataType = RecordType;
interface RecordType {
  key: string;
  status: string | number;
  title: string;
  time: number;
  memory: number | string;
  score: number;
  language: string;
  last_commit: string;
}
interface EvaluateRecordProps {
  evaluaRecords: RecordType[];
}
const EvaluateRecord: React.FC<EvaluateRecordProps> = (props) => {
  const { evaluaRecords } = props;

  return (
    <div>
      <h1 className="px-4 pb-6 pt-4 text-2xl font-light text-[rgb(255,125,55)]">【评测记录】</h1>
      <Table columns={columns} dataSource={evaluaRecords} pagination={false} bordered></Table>
    </div>
  );
};
export default EvaluateRecord;
