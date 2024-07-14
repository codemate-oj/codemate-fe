import { Table, TableColumnsType } from "antd";
import LinkBtn from "../common/link-btn";
interface ScoreboardTableProps {
  data: DataType[];
}
interface DataType {
  _id: string;
  key: string;
  uname: string;
  rank: number;
  rp: number;
  contest: number;
  nSubmit: number;
  nAccept: number;
  totalScore: number;
  // other fields...
  [key: string]: number | string;
}

const RankingScoreboardTable: React.FC<ScoreboardTableProps> = (props) => {
  const { data } = props;

  const tableColumns: TableColumnsType<DataType> = [
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "用户名",
      dataIndex: "uname",
      key: "uname",
    },
    {
      title: "RP",
      dataIndex: "rp",
      key: "rp",
      render: (_, record) => {
        return record.rp.toFixed(0);
      },
    },
    {
      title: "比赛",
      dataIndex: "contest",
      key: "contest",
      render: (_, record) => {
        return record.contest ? parseInt(String(record.contest)) : undefined;
      },
    },
    {
      title: "提交",
      dataIndex: "nSubmit",
      key: "nSubmit",
    },
    {
      title: "AC",
      dataIndex: "nAccept",
      key: "nAccept",
    },
    {
      title: "AC率",
      dataIndex: "nAcceptPercentage",
      key: "nAcceptPercentage",
      render: (_, record) => {
        return Number((record.nAccept / record.nSubmit).toFixed(2)) * 100 + "%";
      },
    },
    {
      title: "签名",
      dataIndex: "totalScore",
      key: "totalScore",
    },
  ];
  const dataSource = data.map((item) => {
    return {
      _id: item._id,
      key: item._id,
      rank: item.rank,
      uname: item.uname,
      rp: item.rp,
      contest: item.contest,
      nSubmit: item.nSubmit,
      nAccept: item.nAccept,
      totalScore: item.totalScore,
    };
  });
  return (
    <>
      <div className="font-bold"></div>
      <Table
        columns={tableColumns}
        dataSource={dataSource}
        pagination={{
          position: ["bottomCenter"],
          total: dataSource.length,
          pageSize: 10,
          showSizeChanger: false,
          itemRender(_, type, element) {
            if (type === "prev") {
              return (
                <>
                  <LinkBtn>首页</LinkBtn>
                  <LinkBtn>上一页</LinkBtn>
                </>
              );
            }
            if (type === "next") {
              return (
                <>
                  <LinkBtn>下一页</LinkBtn>
                  <LinkBtn>末页</LinkBtn>
                </>
              );
            }
            return element;
          },
        }}
      />
    </>
  );
};

export default RankingScoreboardTable;
