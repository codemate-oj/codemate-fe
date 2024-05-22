import PageTitle from "@/components/common/page-title";
import PTop from "@/components/common/p-top";
import PRight from "@/components/common/p-right";
import PBottom from "@/components/common/p-bottom";
import MarkdownRenderer from "@/components/p/markdownRenderer";
import CodeEditor from "@/components/p/codeEditor";
import { request } from "@/lib/request";

import type { Metadata } from "next";

type Props = {
  params: {
    pid: string;
  };
};

type ProblemType = "objective" | "scratch" | "default";

interface Question {
  type: string;
  index: number;
  options: string[];
  content: string;
}

const AVAILABLE_LANG_MAP = {
  "cc.cc14o2": "C++",
  "py.py3": "Python",
};

async function getProblemDetail(pid: string) {
  return request.get(`/p/${pid}` as "/p/{pid}", {
    transformData: (data) => {
      return data;
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.pid) throw new Error("No pid provided");
  const { data: pDetailData } = await getProblemDetail(params.pid);
  return {
    title: `题目详情- ${pDetailData.title}`,
  };
}

function determineQuestionType(pdoc: Awaited<ReturnType<typeof getProblemDetail>>["data"]["pdoc"]): ProblemType {
  if (typeof pdoc?.config !== "object") return "default";
  if (pdoc.config.type === "objective") return "objective";
  if (pdoc.config.langs?.includes("scratch")) return "scratch";
  return "default";
}

function determineAvailableLangs(pdoc: Awaited<ReturnType<typeof getProblemDetail>>["data"]["pdoc"]): string[] {
  // 默认返回所有可用语言
  if (typeof pdoc?.config !== "object" || !Array.isArray(pdoc?.config?.langs) || pdoc.config.langs.length === 0) {
    return Object.keys(AVAILABLE_LANG_MAP);
  }
  // 若有配置则返回配置中的语言
  return pdoc.config.langs.filter((lang) => lang in AVAILABLE_LANG_MAP);
}

const Page = async ({ params }: Props) => {
  if (!params.pid) throw new Error("No pid provided");

  const { data: pDetailData } = await getProblemDetail(params.pid!);

  const pType = determineQuestionType(pDetailData?.pdoc);
  const langs = determineAvailableLangs(pDetailData?.pdoc);
  const content = pDetailData?.pdoc?.content ? JSON.parse(pDetailData.pdoc?.content) : { zh: "", en: "" };
  const markdownContent = content.zh || content.en || "";

  function parseMarkdownContent(markdown: string): Question[] {
    const lines = markdown.split("\n");
    const questions: Question[] = [];
    let currentQuestion: Question | null = null;

    lines.forEach((line) => {
      const match = line.match(/{{\s*(\w+)\((\d+)\)\s*}}/);
      if (match) {
        const [, type, index] = match;
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = { type, index: parseInt(index, 10), options: [], content: "" };
      } else if (currentQuestion && line.trim().startsWith("-")) {
        currentQuestion.options.push(line.trim().substring(1).trim());
      } else if (currentQuestion) {
        currentQuestion.content += line + "\n";
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return questions;
  }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-4">
        <PageTitle>修炼场 {pType == "objective" ? "客观题" : "编程题"}</PageTitle>
        {pDetailData ? <PTop title={pDetailData.pdoc?.title} pid={pDetailData.pdoc?.pid} /> : <p>No data available</p>}
        <div className="flex mt-10">
          <div className="w-4/5 border-r-2 border-dashed pr-4">
            <div>
              <div className="mb-4">
                <MarkdownRenderer markdown={markdownContent} />
              </div>
            </div>
            {/*<CodeEditor langs={langs!} />*/}
            {pType === "default" ? <CodeEditor langs={langs} /> : null}
          </div>
          <div className="w-1/5 pl-5">
            <PRight />
          </div>
        </div>
        <PBottom type={pType} />
      </div>
    </div>
  );
};

export default Page;
