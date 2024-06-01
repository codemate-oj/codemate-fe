"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";
import { useCodeLangContext } from "@/providers/code-lang-provider";

interface PBottomProps {
  type: string;
  pid: string;
}
const PBottom: React.FC<PBottomProps> = (props) => {
  const { type, pid } = props;
  const { lang } = useCodeLangContext();

  const handleSubmit = async () => {
    const code = localStorage.getItem(`code-${pid}`) || "";

    await request.post(
      `/p/${pid}/submit` as "/p/{pid}/submit",
      {
        lang: lang,
        pretest: false,
        code: code,
      }
      // { ...forwardAuthClient() }
    );
  };

  return (
    <div>
      <Button className="mr-2" onClick={handleSubmit}>
        {type == "scratch" ? "开始答题" : "确认提交"}
      </Button>
      <Button variant={"outline"} className="border-primary  text-primary hover:text-primary  mr-2 hover:bg-accent/20">
        上一题
      </Button>
      <Button variant={"outline"} className="border-primary   text-primary hover:text-primary  mr-2 hover:bg-accent/30">
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
