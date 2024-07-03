"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { request } from "@/lib/request";
import { useCodeLangContext } from "@/providers/code-lang-provider";
import ActionBar from "./action-bar";
import { loginGuard } from "@/lib/login-guard";

interface IProps {
  type: string;
  pid: string;
}
const CodeActionBar: React.FC<IProps> = (props) => {
  const { type, pid } = props;
  const { lang } = useCodeLangContext();

  const handleSubmit = async () => {
    const code = localStorage.getItem(`code-${pid}`) || "";
    await loginGuard(async () => {
      const rid = await request.post(
        `/p/${pid}/submit` as "/p/{pid}/submit",
        {
          lang: lang,
          pretest: false,
          code: code,
        },
        { transformData: (data) => data.data.rid }
      );
      window.open(`/record/${rid}`);
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div>
        <Button onClick={handleSubmit}>{type == "scratch" ? "开始答题" : "确认提交"}</Button>
      </div>
      <ActionBar pid={pid} />
    </div>
  );
};
export default CodeActionBar;
