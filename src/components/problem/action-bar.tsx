"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { request } from "@/lib/request";
import { HydroError } from "@/lib/error";
import { toast } from "sonner";

interface IProps {
  pid: string;
}

const ActionBar: React.FC<IProps> = ({ pid }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tid = searchParams.get("tid");

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
    <div className="space-x-2">
      <Button
        variant={"outline"}
        onClick={() => handleJump("prev")}
        className="border-primary text-primary hover:bg-accent/20 hover:text-primary"
      >
        上一题
      </Button>
      <Button
        variant={"outline"}
        onClick={() => handleJump("next")}
        className="border-primary text-primary hover:bg-accent/30 hover:text-primary"
      >
        下一题
      </Button>
      <Button variant={"outline"} className="hover:bg-accent/30">
        上难度
      </Button>
      <Button variant={"outline"} className="hover:bg-accent/30">
        评价
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          router.push("/");
        }}
        className="hover:bg-accent/30"
      >
        重新选题
      </Button>
      {/* <Button className="bg-blue-500 hover:bg-blue-500/90">分享</Button>
      <Button>PK邀请</Button> */}
    </div>
  );
};

export default ActionBar;
