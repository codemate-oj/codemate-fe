import React from "react";
import { Button } from "@/components/ui/button";

interface PBottomProps {
  type: string;
}
const PBottom: React.FC<PBottomProps> = (props) => {
  const { type } = props;

  return (
    <div>
      <Button className="mr-2">{type == "scratch" ? "开始答题" : "确认提交"}</Button>
      <Button variant={"outline"} className="border-primary mr-2 hover:bg-accent/20">
        上一题
      </Button>
      <Button variant={"outline"} className="border-primary mr-2 hover:bg-accent/30">
        下一题
      </Button>
      <Button variant={"outline"} className="mr-2 hover:bg-accent/30">
        上难度
      </Button>
      <Button variant={"outline"} className="mr-2 hover:bg-accent/30">
        评价
      </Button>
      <Button variant={"outline"} className="mr-2 hover:bg-accent/30">
        重新选题
      </Button>
      <Button className="bg-blue-500 hover:bg-blue-500/90 mr-2">分享</Button>
      <Button className="mr-2">PK邀请</Button>
    </div>
  );
};
export default PBottom;
