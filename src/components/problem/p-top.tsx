"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";

interface PTopProps {
  nAccept?: number;
  nSubmit?: number;
  difficulty?: number;
  tag?: string[];
  title?: string;
  pid?: string;
  uname?: string;
}

const PTop: React.FC<PTopProps> = (props) => {
  const { title, pid, tag, difficulty, nSubmit, nAccept, uname } = props;
  const [isCollect, setIsCollect] = useState(true);

  const list = [
    { name: "知识点", value: tag },
    { name: "难度值", value: difficulty },
    { name: "尝试", value: nSubmit },
    { name: "AC", value: nAccept },
    { name: "上传者", value: uname },
  ];
  const collect = async () => {
    setIsCollect(false);

    await request.post("/p", { operation: "star" as "unstar", pid: 1 });
    // console.log(result, "11");
  };
  const disCollect = async () => {
    setIsCollect(true);

    await request.post("/p", { operation: "unstar" as const, pid: 1 });
    // console.log(result, "11");
  };

  return (
    <div>
      <div className="mb-4 flex items-center">
        <div className="text-[2rem] font-bold">{pid} ：</div>
        <div className="mr-7 text-[2rem] font-bold">{title}</div>
        <Button
          onClick={isCollect ? () => collect() : () => disCollect()}
          variant={"outline"}
          className="mr-2 border border-primary text-primary hover:bg-accent/30 hover:text-primary"
        >
          收藏
        </Button>
        <Button
          variant={"outline"}
          className="border border-blue-500 text-blue-500 hover:bg-accent/30 hover:text-blue-500"
        >
          加入题单
        </Button>
      </div>
      <div className="flex justify-around bg-[#F9F9F9] py-2 font-yahei text-[#797979]">
        {list.map((item) => {
          if (!item.value) return null;
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
