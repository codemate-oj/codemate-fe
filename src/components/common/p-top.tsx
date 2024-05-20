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
        <div className="text-[2rem] font-bold mr-7">{pid}：</div>
        <div className="text-[2rem] font-bold mr-7">{title}</div>
        <Button variant={"outline"} className="border-primary   mr-2">
          上一题
        </Button>
        <Button variant={"outline"} className="border-blue-500   ">
          加入题单
        </Button>
      </div>
      <div className="flex bg-gray-100 justify-around py-2">
        {list.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </div>
  );
};
export default PTop;
