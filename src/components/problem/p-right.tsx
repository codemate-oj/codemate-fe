import React from "react";

interface PRightProps {}
const PRight: React.FC<PRightProps> = (props) => {
  const {} = props;
  const list = ["进入在线编程模式", "文字题讲解", "讲题视频", "讲题视频1"];
  return (
    <div>
      {list.map((item) => {
        return (
          <div className="py-2 font-yahei" key={item}>
            {item}
          </div>
        );
      })}
    </div>
  );
};
export default PRight;
