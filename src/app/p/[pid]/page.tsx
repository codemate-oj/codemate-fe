import PageTitle from "@/components/common/page-title";
import PTop from "@/components/problem/p-top";
import PRight from "@/components/problem/p-right";
import PBottom from "@/components/problem/p-bottom";
import MarkdownRenderer from "@/components/problem/markdownRenderer";
import CodeInput from "@/components/problem/code-input";
import { request } from "@/lib/request";

import type { Metadata } from "next";
import { forwardAuthHeader } from "@/lib/forward-auth";
import CodeLangProvider from "@/providers/code-lang-provider";

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
  console.log(pType);
  const langs = determineAvailableLangs(pDetailData?.pdoc);
  const markdownContent = extractMarkdownContent(pDetailData?.pdoc);

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
    <CodeLangProvider>
      <div>
        <div className="max-w-screen-xl mx-auto p-4">
          <PageTitle>修炼场 {pType == "objective" ? "客观题" : "编程题"}</PageTitle>
          <PTop title={pDetailData.pdoc?.title} pid={pDetailData.pdoc?.pid} />
          <div className="flex mt-10">
            <div className="w-4/5 border-r-2 border-dashed pr-4">
              <div>
                <div className="mb-4">
                  <MarkdownRenderer markdown={markdownContent} />
                </div>
              </div>
              {pType === "default" ? <CodeInput langs={langs} /> : null}
            </div>
            <div className="w-1/5 pl-5">
              <PRight />
            </div>
          </div>
          <PBottom type={pType} />
        </div>
      </div>
    </CodeLangProvider>
  );
};

export default Page;
