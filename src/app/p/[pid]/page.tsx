import PageTitle from "@/components/common/page-title";
import PTop from "@/components/problem/p-top";
import PRight from "@/components/problem/p-right";
import CodeActionBar from "@/components/problem/code-action-bar";
import CodeInput from "@/components/problem/code-input";
import { request } from "@/lib/request";

import type { Metadata } from "next";
import { forwardAuthHeader } from "@/lib/forward-auth";
import CodeLangProvider, { langType } from "@/providers/code-lang-provider";
import { extractQuestionsFromMarkdown } from "@/lib/problem-parse";
import React, { Suspense } from "react";
import Loading from "@/components/ui/loading";
import dynamic from "next/dynamic";
import code from "@/lib/unified/code";
import media from "@/lib/unified/media";

type Props = {
  params: {
    pid: string;
  };
};

type ProblemType = "objective" | "scratch" | "default";

const MarkdownRenderer = React.lazy(() => import("@/components/common/markdown-renderer"));
const FormilyRenderer = dynamic(() => import("@/components/problem/formily-renderer"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

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
    title: `题目详情 - ${pDetailData.title}`,
  };
}

function determineQuestionType(pdoc: Awaited<ReturnType<typeof getProblemDetail>>["data"]["pdoc"]): ProblemType {
  // 当config不存在时，返回默认类型
  if (typeof pdoc?.config !== "object") return "default";
  // 当config存在时，返回config中的类型
  if (pdoc.config.type === "objective") return "objective";
  if (pdoc.config.langs?.length === 1 && pdoc.config.langs?.includes("scratch")) return "scratch";
  return "default";
}

function determineAvailableLangs(pdoc: Awaited<ReturnType<typeof getProblemDetail>>["data"]["pdoc"]): string[] {
  const langMap: Record<string, string> = {
    "cc.cc14o2": "C++",
    "py.py3": "Python",
  };
  // 默认返回所有可用语言
  const allLangs = Object.keys(langMap);
  if (typeof pdoc?.config !== "object" || !Array.isArray(pdoc?.config?.langs) || pdoc.config.langs.length === 0) {
    return allLangs;
  }
  const langs = pdoc.config.langs.filter((lang) => {
    return allLangs.includes(lang);
  });
  // 若有配置则返回配置中的语言
  return langs.length > 0 ? langs : allLangs;
}

function extractMarkdownContent(pdoc: Awaited<ReturnType<typeof getProblemDetail>>["data"]["pdoc"]) {
  if (!pdoc) return "";
  if (typeof pdoc?.content !== "string") return "";
  let _content = pdoc.content;
  try {
    // 部分题目可能没有使用多语言模式
    const { zh, en } = JSON.parse(pdoc.content) as { zh: string; en: string };
    _content = zh || en;
  } catch (error) {
    console.error(error);
  }
  return _content;
}

const Page = async ({ params }: Props) => {
  if (!params.pid) throw new Error("No pid provided");

  const { data: pDetailData } = await getProblemDetail(params.pid!);

  const pType = determineQuestionType(pDetailData?.pdoc);
  const langs = determineAvailableLangs(pDetailData?.pdoc);
  const markdownContent = extractMarkdownContent(pDetailData?.pdoc);

  return (
    <CodeLangProvider>
      <div>
        <div className="mx-auto max-w-screen-xl p-4">
          <PageTitle>修炼场 {pType == "objective" ? "客观题" : "编程题"}</PageTitle>
          <PTop {...pDetailData.pdoc} starred={pDetailData.psdoc?.star} uname={pDetailData.udoc.uname} />
          <div className="mt-10 flex">
            <div className="w-4/5 border-r-2 border-dashed pr-4">
              <div>
                <Suspense fallback={<Loading />}>
                  <div className="mb-4">
                    {pType == "objective" ? (
                      <FormilyRenderer
                        pid={pDetailData.pdoc?.pid}
                        schema={extractQuestionsFromMarkdown(markdownContent)}
                      />
                    ) : (
                      <MarkdownRenderer
                        markdown={markdownContent}
                        plugins={[
                          {
                            hookIn: "pre-parse",
                            plugin: code,
                          },
                          {
                            hookIn: "pre-parse",
                            plugin: media(`p/${pDetailData.pdoc.docId}/file`, pDetailData.pdoc.additional_file),
                          },
                        ]}
                        className="prose-pdetail"
                      />
                    )}
                  </div>
                </Suspense>
              </div>
              {pType === "default" && (
                <>
                  <CodeInput langs={langs as langType[]} pid={params.pid} />
                  <CodeActionBar type={pType} pid={params.pid} />
                </>
              )}
            </div>
            <div className="w-1/5 pl-5">
              <PRight pid={params.pid} />
            </div>
          </div>
        </div>
      </div>
    </CodeLangProvider>
  );
};

export default Page;
