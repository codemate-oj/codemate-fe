import React from "react";
import store from "@/store/login";
import { Button } from "@/components/ui/button";

interface PTopProps {
  nAccept: number;
  nSubmit: number;
  difficulty: number;
  tag: string[];
  title: string;
  pid: string;
  uname: string;
}
const PTop: React.FC<PTopProps> = (props) => {
  const { title, pid, tag, difficulty, nSubmit, nAccept, uname } = props;

  console.log(title);
  const list = [
    { name: "知识点", value: tag },
    { name: "难度值", value: difficulty },
    { name: "尝试", value: nSubmit },
    { name: "AC", value: nAccept },
    { name: "上传者", value: uname },
  ];
  console.log(props, 1);
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="text-[2rem] font-bold  ">{pid} ：</div>
        <div className="text-[2rem] font-bold mr-7">{title}</div>
        <Button
          variant={"outline"}
          className="border-primary border   text-primary hover:text-primary  mr-2 hover:bg-accent/30"
        >
          收藏
        </Button>
        <Button
          variant={"outline"}
          className="border-blue-500 text-blue-500  hover:text-blue-500  border  hover:bg-accent/30 "
        >
          加入题单
        </Button>
      </div>
      <div className="flex bg-[#F9F9F9] justify-around py-2 font-yahei text-[#797979]">
        {list.map((item) => {
          if (item.name == "知识点")
            return (
              <div key={item.name}>
                <span className="mr-2">{item.name}:</span>
                {Array.isArray(item.value) ? (
                  item.value.map((item, index) => {
                    if (index < 3) {
                      return (
                        <span key={index} className="mr-2">
                          {item}
                        </span>
                      );
                    }
                    return null;
                  })
                ) : (
                  // 处理 item.value 不是数组的情况
                  <span>{item.value}</span>
                )}
              </div>
            );
          return (
            <div key={item.name}>
              <span className="mr-2"> {item.name}:</span> {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PTop;
