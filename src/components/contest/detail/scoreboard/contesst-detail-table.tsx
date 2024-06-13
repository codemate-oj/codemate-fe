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
    };
  });
  return (
    <>
      <div className="font-bold"></div>
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
