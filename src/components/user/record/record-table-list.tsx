import { TableProps } from "antd";

const tableColumns: TableProps["columns"] = [
  {
    title: "编号",
    dataIndex: "pid",
    render(value, record) {
      return (
        <a href={`/p/${record.pid}`} target="_blank">
          P{"0".repeat(5 - value.toString().length)}
          {value}
        </a>
      );
    },
  },
  {
    title: "题目名称",
    dataIndex: "name",
    render(value, record) {
      return (
        <a href={`/record/${record.rid}`} target="_blank" className="record-item-title">
          {value}
        </a>
      );
    },
  },
  {
    title: "算法标签",
    dataIndex: "tags",
    render(value) {
      return (
        <div className="record-item-tags-container">
          {value
            .filter((tag) => {
              (UiContext?.domain?.bulletin_json?.undisplayedLabels as string[] | undefined)?.includes(tag)
                ? false
                : true;
            })
            .map((tag) => (
              <div key={tag} className="record-item-tag">
                {tag}
              </div>
            ))}
        </div>
      );
    },
  },
  {
    title: "难度",
    dataIndex: "difficulty",
  },
  {
    title: "评测结果",
    dataIndex: "result",
    render(value, record) {
      return (
        <span style={{ color: value === STATUS_ACCEPTED ? "#01FA05" : "#FF7D37" }}>
          {record["lang"] !== "_" ? record.score : value === STATUS_ACCEPTED ? "正确" : "错误"}
        </span>
      );
    },
  },
  {
    title: "平均AC",
    dataIndex: "acPercentage",
    render(value) {
      return `${(value * 100).toFixed()}%`;
    },
  },
  {
    title: "答题时间",
    dataIndex: "submitAt",
    render: (value) => getTimeDiffFromNow(value),
  },
];
