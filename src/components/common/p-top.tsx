import React from "react";
import store from "@/store/login";
import { Button } from "@/components/ui/button";

interface PTopProps {
  title: string;
  pid: string;
}
const PTop: React.FC<PTopProps> = (props) => {
  const { title, pid } = props;

  const list = ["知识点", "偏好", "响应值", "容量值", "难度值", "尝试", "AC", "上传者", "来源", "命题者"];

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="text-[2rem] font-bold  ">{pid} ：</div>
        <div className="text-[2rem] font-bold mr-7">{title}</div>
        <Button
          variant={"outline"}
          className="border-primary border-2  text-primary hover:text-primary  mr-2 hover:bg-accent/30"
        >
          收藏
        </Button>
        <Button
          variant={"outline"}
          className="border-blue-500 text-blue-500  hover:text-blue-500  border-2 hover:bg-accent/30 "
        >
          加入题单
        </Button>
      </div>
      <div className="flex bg-[#F9F9F9] justify-around py-2 font-yahei text-[#797979]">
        {list.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </div>
  );
};
export default PTop;
