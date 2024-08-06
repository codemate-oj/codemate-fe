"use client";
import type { ProblemDetailAPI } from "@/app/p/[pid]/App";
import { getMarkdownContent, getProblemType, getProgrammingLangs } from "@/lib/problem";
import React, { Suspense } from "react";
import PageTitle from "../common/page-title";
import PTop from "./p-top";
import Loading from "../ui/loading";
import { extractQuestionsFromMarkdown } from "@/lib/problem-parse";
import code from "@/lib/unified/code";
import media from "@/lib/unified/media";
import CodeInput from "./code-input";
import { LangType } from "@/providers/code-lang-provider";
import CodeActionBar from "./code-action-bar";
import ProblemSidePanel from "./problem-side-panel";

const FormilyRenderer = React.lazy(() => import("./formily-renderer"));
const MarkdownRenderer = React.lazy(() => import("../common/markdown-renderer"));

interface Props {
  pid: string;
  data?: ProblemDetailAPI;
  tid?: string;
  fromContest?: boolean;
}

const DetailBodyPage: React.FC<Props> = ({ pid, data }) => {
  const problemType = getProblemType(data?.pdoc);
  const markdownContent = getMarkdownContent(data?.pdoc);
  const langs = getProgrammingLangs(data?.pdoc);

  const renderContent = () => {
    if (problemType === "objective") {
      const formSchema = extractQuestionsFromMarkdown(markdownContent);
      return <FormilyRenderer pid={pid} schema={formSchema} />;
    } else {
      const docId = data?.pdoc.docId;
      return (
        <MarkdownRenderer
          markdown={markdownContent}
          plugins={[
            {
              hookIn: "pre-parse",
              plugin: code,
            },
            {
              hookIn: "pre-parse",
              plugin: media(`p/${docId}/file`),
            },
          ]}
          className="prose-pdetail"
        />
      );
    }
  };

  const renderActions = () => {
    if (problemType === "objective") return null;
    return (
      <>
        {problemType === "default" && <CodeInput langs={langs as LangType[]} pid={pid} />}
        <CodeActionBar type={problemType} pid={pid} />
      </>
    );
  };

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <PageTitle>修炼场 {problemType === "objective" ? "客观题" : "编程题"}</PageTitle>
      <PTop {...data?.pdoc} starred={data?.psdoc?.star} uname={data?.udoc?.uname} />
      <div className="mt-10 flex">
        <div className="flex-1 border-r-2 border-dashed pr-4">
          <div>
            <Suspense fallback={<Loading />}>{renderContent()}</Suspense>
          </div>
          {renderActions()}
        </div>
        <div className="min-w-1/5 pl-5">
          <ProblemSidePanel pid={pid} entryType={problemType} />
        </div>
      </div>
    </div>
  );
};

export default DetailBodyPage;
