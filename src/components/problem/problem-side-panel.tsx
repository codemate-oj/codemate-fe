"use client";
import loginStore from "@/store/login";
import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import ScratchIframe from "./scratch-iframe";

const OnlineCode = dynamic(() => import("@/components/online_code/online-code"), {
  ssr: false,
  loading: () => <Spin />,
});

type ItemType = {
  name: string;
  hidden?: boolean;
} & ({ component: React.ReactNode } | { href: string });

interface IProps {
  pid: string;
  entryType: "objective" | "scratch" | "default" | "solution";
}

const ProblemSidePanel: React.FC<IProps> = ({ pid, entryType }) => {
  const user = loginStore.user.use();
  const [showIDE, setShowIDE] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const searchParams = useSearchParams();

  const isFromContest = Boolean(searchParams.get("fromContest"));

  const items: ItemType[] = [
    {
      name: "进入在线编程模式",
      component: (
        <div className="flex items-center gap-2">
          <button
            className="hover:text-primary"
            onClick={() => {
              if (entryType === "default") {
                setShowIDE(true);
              } else if (entryType === "scratch") {
                setShowScratch(true);
              }
            }}
          >
            {entryType === "scratch" ? "进入图形化环境" : "进入在线编程模式"}
          </button>
          {showIDE && <OnlineCode pid={pid} toggleOnlineCodeVisibility={() => setShowIDE(false)} />}
          {showScratch && <ScratchIframe pid={pid} onExit={() => setShowScratch(false)} />}
        </div>
      ),
      hidden: entryType !== "default" && entryType !== "scratch",
    },
    { name: "文字题讲解", href: `/p/${pid}/solution`, hidden: isFromContest || entryType === "solution" },
    { name: "讲题视频", href: `/p/${pid}/solution`, hidden: isFromContest || entryType === "solution" },
    { name: "名师评题（预约）", href: `/p/${pid}/solution`, hidden: true },
    { name: "知识点讲解视频", href: `/p/${pid}/solution`, hidden: true },
    { name: "名师讲解知识点（预约）", href: `/p/${pid}/solution`, hidden: true },
    { name: "复制该题", href: "#" },
    { name: "去论坛看看该题", href: "#", hidden: isFromContest },
    { name: "提交记录", href: `/record?pid=${pid}&uidOrName=${user?._id ?? ""}` },
  ];
  return (
    <div className="space-y-4">
      {items
        .filter((i) => !i.hidden)
        .map((item) => (
          <React.Fragment key={item.name}>
            {"component" in item ? (
              item.component
            ) : (
              <Link className={cn("block font-yahei hover:text-primary")} target="_blank" href={item.href}>
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};
export default ProblemSidePanel;
