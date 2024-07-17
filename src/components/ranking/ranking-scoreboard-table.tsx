import { Table, TableColumnsType } from "antd";
import LinkBtn from "../common/link-btn";
interface ScoreboardTableProps {
  udocs: UdocsType[];
  rpInfo: RpInfoType;
}

interface UdocsType {
  _id: string;
  uname: string;
  // other fields...
  [key: string]: number | string;
}
interface RpInfoType {
  [key: string]: {
    rank: number;
    rp: number;
    rpInfo: {
      contest: number;
      [key: string]: number | string;
    };
    contest: number;
    nSubmit: number;
    nAccept: number;
    totalScore: number;
  };
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
  totalScore: number | string;
  // other fields...
  [key: string]: number | string;
}

const RankingScoreboardTable: React.FC<ScoreboardTableProps> = (props) => {
  const { udocs, rpInfo } = props;
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
        return Number(record.rp).toFixed(0);
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
  const dataSource = udocs.map((item) => {
    return {
      _id: item._id,
      key: item._id,
      rank: rpInfo[item._id].rank,
      uname: item.uname,
      rp: rpInfo[item._id].rp,
      contest: rpInfo[item._id]?.rpInfo.contest,
      nSubmit: rpInfo[item._id].nSubmit,
      nAccept: rpInfo[item._id].nAccept,
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
