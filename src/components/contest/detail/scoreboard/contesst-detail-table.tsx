import LinkBtn from "@/components/common/link-btn";
import { Table, TableProps } from "antd";
interface ScoreboardTableProps {
  tableColumns: {
    value: string;
    type: string;
    // 0: problem, 1: user, 2: rank
  }[];
  dataSource: DataType[];
}
interface DataType {
  key: string;
  user: string;
  rank: number;
  [key: string]: number | string;
}

const ScoreboardTable: React.FC<ScoreboardTableProps> = (props) => {
  const { tableColumns, dataSource } = props;

  const columns: TableProps<DataType>["columns"] = tableColumns.map((item) => {
    if (item.type == "solved") {
      return {
        title: "总分",
        dataIndex: "total_score",
        key: "total_score",
        onCell: (record) => {
          let classNames = "";
          if (Number(record.rank) <= 10) {
            classNames += "font-bold ";
          }
          return { className: classNames };
        },
      };
    }
    return {
      title: item.value,
      dataIndex: item.type == "problem" ? item.value : item.type,
      key: item.type == "problem" ? item.value : item.type,
      onCell: (record) => {
        let classNames = "";
        if (item.value == "#") classNames += "bg-orange-500 ";

        if (Number(record.rank) <= 10) {
          classNames += "font-bold ";
        }
        return { className: classNames };
      },
      render: (text) => {
        if (item.type == "problem") {
          const score = Number(text);
          let className = "";
          if (score <= 20) {
            className = "text-red-500";
          } else if (score <= 40) {
            className = "text-yellow-600";
          } else if (score <= 60) {
            className = "text-yellow-500";
          } else if (score <= 80) {
            className = "text-green-300";
          } else if (score <= 100) {
            className += " text-green-500";
          }

          return <div className={className}>{score}</div>;
        }
        return text;
      },
    };
  });
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ["bottomCenter"],
          total: dataSource.length,
          pageSize: 20,
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

export default ScoreboardTable;
