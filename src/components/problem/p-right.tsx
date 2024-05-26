import React from "react";

interface PRightProps {}
const PRight: React.FC<PRightProps> = (props) => {
  const {} = props;
  const list = [
    { name: "进入在线编程模式" },
    { name: "文字题讲解" },
    { name: "讲题视频" },
    { name: "名师评题（预约）" },
    { name: "知识点讲解视频" },
    { name: "名师讲解知识点（预约）" },
    { name: "复制该题" },
    { name: "去论坛看看该题" },
    { name: "提交记录" },
  ];
  return (
    <div>
      {list.map((item) => {
        return (
          <div className="py-2 font-yahei" key={item.name}>
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
export default PRight;
