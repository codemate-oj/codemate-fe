import PageTitle from "@/components/common/page-title";
import PTop from "@/components/common/p-top";
import PRight from "@/components/common/p-right";
import PBottom from "@/components/common/p-bottom";
import MarkdownRenderer from "@/components/p/markdownRenderer";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/p/codeEditor";
import { headers } from "next/headers";
import { useRequest } from "ahooks";
import { request } from "@/lib/requestServer";
import { useRouter } from "next/navigation";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    pid: string;
  };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { data: pDetailData } = await request.get(`/p/${params.pid!}` as "/p/{pid}", {
    transformData: (data) => {
      console.log(data);
      return data;
    },
  });

  return {
    title: `题目详情- ${pDetailData.title}`,
  };
}

const Page = async ({ params }: { params: { pid: string } }) => {
  // const pDetailData = await fetch(`http://43.139.233.159/p/${params.pid!}`, {
  //   method: "GET",
  //   headers: { Accept: "application/json" },
  // }).then((response) => response.text());
  let pType: "default" | "objective" | "scratch" = "objective";

  //是``不是”“
  const { data: pDetailData } = await request.get(`/p/${params.pid!}` as "/p/{pid}", {
    transformData: (data) => {
      // console.log(data);
      return data;
    },
  });

  if (typeof pDetailData.pdoc?.config == "object") {
    if (pDetailData.pdoc.config.type == "default") {
      if (pDetailData.pdoc.config.langs?.includes("scratch")) pType = "scratch";
      else pType = "default";
    }
  }
  console.log(pType, "类型");

  //解析markdown
  interface Question {
    type: string;
    index: number;
    options: string[];
    content: string;
  }
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

  const content = pDetailData?.pdoc?.content ? JSON.parse(pDetailData.pdoc?.content) : { zh: "", en: "" };
  const markdownContent = content.zh || content.en || "";

  //关于langs
  const pdocConfigLangs =
    typeof pDetailData?.pdoc?.config === "object" && Array.isArray(pDetailData?.pdoc.config.langs)
      ? pDetailData.pdoc.config.langs
      : null;
  const availableLangs: Record<string, string> = {
    "cc.cc14o2": "C++",
    "py.py3": "Python",
  };
  const langs = pdocConfigLangs
    ? pdocConfigLangs.filter((lang) => lang in availableLangs)
    : Object.keys(availableLangs);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-4">
        <PageTitle>修炼场 {pType == "objective" ? "客观题" : "编程题"}</PageTitle>
        {pDetailData ? <PTop title={pDetailData.pdoc?.title} pid={pDetailData.pdoc?.pid} /> : <p>No data available</p>}
        <div className="flex mt-10">
          <div className="w-4/5 border-r-2 border-dashed pr-4">
            <div>
              <div className="mb-4">
                {" "}
                <MarkdownRenderer markdown={markdownContent} />
              </div>
            </div>
            {/*<CodeEditor langs={langs!} />*/}
            {pType === "default" ? <CodeEditor langs={langs!} /> : <></>}
          </div>
          <div className="w-1/5 pl-5">
            <PRight />
          </div>
        </div>
        <PBottom type={pType!} />
      </div>
    </div>
  );
};

export default Page;
