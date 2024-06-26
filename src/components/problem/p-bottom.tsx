"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";
import { useCodeLangContext } from "@/providers/code-lang-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { HydroError } from "@/lib/error";
import { toast } from "sonner";

interface PBottomProps {
  type: string;
  pid: string;
}
const PBottom: React.FC<PBottomProps> = (props) => {
  const { type, pid } = props;
  const router = useRouter();
  const { lang } = useCodeLangContext();
  const searchParams = useSearchParams();

  const tid = searchParams.get("tid");

  const handleSubmit = async () => {
    const code = localStorage.getItem(`code-${pid}`) || "";

    await request.post(`/p/${pid}/submit` as "/p/{pid}/submit", {
      lang: lang,
      pretest: false,
      code: code,
    });
  };

  const handleJump = async (operation: "prev" | "next") => {
    try {
      const jumpTo = await request.post(
        `/p-list/${tid}` as "/p-list/{tid}",
        {
          operation: operation as "prev",
          curPid: pid,
        },
        {
          transformData: (data) => data.data.pid,
        }
      );
      router.push(`/p/${jumpTo}${window.location.search}`);
    } catch (e) {
      if (e instanceof HydroError) {
        toast.warning(e.message);
      }
    }
  };

  return (
    <div>
      <Button className="mr-2" onClick={handleSubmit}>
        {type == "scratch" ? "开始答题" : "确认提交"}
      </Button>
      <Button
        variant={"outline"}
        onClick={() => handleJump("prev")}
        className="mr-2 border-primary text-primary hover:bg-accent/20 hover:text-primary"
      >
        上一题
      </Button>
      <Button
        variant={"outline"}
        onClick={() => handleJump("next")}
        className="mr-2 border-primary text-primary hover:bg-accent/30 hover:text-primary"
      >
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
      <Button className="mr-2 bg-blue-500 hover:bg-blue-500/90">分享</Button>
      <Button className="mr-2">PK邀请</Button>
    </div>
  );
};
export default PBottom;
