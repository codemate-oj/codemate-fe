"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";
import { useCodeLangContext } from "@/providers/code-lang-provider";
import ActionBar from "./action-bar";
import { loginGuard } from "@/lib/login-guard";
import emitter from "@/lib/event-emitter";
import { useSearchParams } from "next/navigation";

interface IProps {
  type: string;
  pid: string | number;
}
const CodeActionBar: React.FC<IProps> = (props) => {
  const { type, pid } = props;
  const { lang } = useCodeLangContext();
  const searchParams = useSearchParams();

  const handleSubmit = async () => {
    const code = localStorage.getItem(`code-${pid}`) || "";
    await loginGuard(async () => {
      const isFromContest = searchParams.get("fromContest") === "true" && searchParams.get("tid");

      const rid = await request.post(
        `/p/${pid}/submit` as "/p/{pid}/submit",
        {
          lang: lang,
          pretest: false,
          code: code,
          tid: isFromContest ? searchParams.get("tid") ?? "" : "",
        },
        { transformData: (data) => data.data.rid }
      );
      window.open(`/record/${rid}`);
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div>
        <Button
          onClick={async () => {
            if (type === "default") {
              await handleSubmit();
            } else if (type === "scratch" && (await loginGuard())) {
              emitter.emit("showScratch");
            }
          }}
        >
          {type == "scratch" ? "开始答题" : "确认提交"}
        </Button>
      </div>
      <ActionBar pid={pid} />
    </div>
  );
};
export default CodeActionBar;
