import React from "react";
import type { Metadata } from "next";
import { request } from "@/lib/request";
import { forwardAuthHeader } from "@/lib/forward-auth";
import PageTitle from "@/components/common/page-title";
import PRight from "@/components/problem/p-right";
import SolutionItem from "@/components/solution/solution-item";

type Props = {
  params: {
    pid: string;
  };
};
async function getProblemDetail(pid: string) {
  return request.get(`/p/${pid}` as "/p/{pid}", {
    transformData: (data) => {
      return data;
    },
    ...forwardAuthHeader(),
  });
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.pid) throw new Error("No pid provided");
  const { data: pDetailData } = await getProblemDetail(params.pid);
  return {
    title: `题解 - ${pDetailData.title}`,
  };
}
type ProblemType = "objective" | "scratch" | "default";
function determineQuestionType(pdoc: Awaited<ReturnType<typeof getProblemDetail>>["data"]["pdoc"]): ProblemType {
  // 当config不存在时，返回默认类型
  if (typeof pdoc?.config !== "object") return "default";
  // 当config存在时，返回config中的类型
  if (pdoc.config.type === "objective") return "objective";
  if (pdoc.config.langs?.length === 1 && pdoc.config.langs?.includes("scratch")) return "scratch";
  return "default";
}

const SolutionPage = async ({ params }: Props) => {
  const { data: pDetailData } = await getProblemDetail(params.pid!);

  const pType = determineQuestionType(pDetailData?.pdoc);
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <PageTitle>修炼场 {pType == "objective" ? "客观题 题解" : "编程题 题解"}</PageTitle>
      <div className="flex w-4/5 items-center justify-between">
        <div>
          <span className="text-[2rem] font-bold">{pDetailData.pdoc?.pid} ：</span>
          <span className="mr-7 text-[2rem] font-bold">{pDetailData?.title}</span>
        </div>
        <span className="pr-4 text-[2rem] font-bold text-primary">正确答案：A</span>
      </div>
      <div>
        <span className="font-yahei text-[#797979]">文字解答数量：</span>
        <span className="text-primary">2篇</span>
      </div>
      <div className="mt-10 flex">
        <div className="w-4/5 border-r-2 border-dashed pr-4">
          <SolutionItem></SolutionItem>
        </div>
        <div className="w-1/5 pl-5">
          <PRight />
        </div>
      </div>
    </div>
  );
};
export default SolutionPage;
