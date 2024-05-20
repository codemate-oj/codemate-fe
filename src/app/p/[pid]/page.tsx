"use client";

import PageTitle from "@/components/common/page-title";
import PTop from "@/components/common/p-top";
import PRight from "@/components/common/p-right";
import PBottom from "@/components/common/p-bottom";
import MarkdownRenderer from "@/components/p/markdownRenderer";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/p/codeEditor";
import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import FormilySchema from "@/components/p/formilySchema";

// 定义问题对象的接口
interface Question {
  type: string;
  index: number;
  options: string[];
  content: string;
}

const Page = ({ params }: { params: { pid: string } }) => {
  const [code, setCode] = useState(() => {
    return localStorage.getItem("code") || "// Write your code here";
  });

  useEffect(() => {
    localStorage.setItem("code", code);
  }, [code]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const { data: pDetailData } = useRequest(async () => {
    const { data } = await request.get(`/p/${params.pid!}` as "/p/{pid}", {
      transformData: (data) => {
        console.log(data);
        return data;
      },
    });
    console.log(data, "数据");
    return { data };
  });

  function determineQuestionType() {
    const config = pDetailData?.data.pdoc?.config;
    if (typeof config === "object") {
      if (config.type === "default") {
        return Array.isArray(config.langs) && config.langs.includes("scratch") ? "scratch" : "default";
      } else if (config.type === "objective") {
        return "objective";
      }
    }
    return null; // 或者返回其他适当的默认值
  }

  let pType = determineQuestionType();
  console.log(pType);

  // 解析Markdown内容，提取问题和选项
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

  // 生成Formily JSON Schema
  function generateFormilySchema(questions: Question[]): Record<string, any> {
    const formilySchema: Record<string, any> = {
      type: "object",
      properties: {},
    };

    questions.forEach((question) => {
      const { type, index, options, content } = question;
      const basePath = `question${index}`;
      if (type === "select") {
        formilySchema.properties[basePath] = {
          type: "string",
          title: content.trim(),
          enum: options,
          "x-component": "CustomSelect",
        };
      } else if (type === "multiselect") {
        formilySchema.properties[basePath] = {
          type: "array",
          title: content.trim(),
          enum: options,
          "x-component": "CustomCheckboxGroup",
        };
      } else if (type === "input") {
        formilySchema.properties[basePath] = {
          type: "string",
          title: content.trim(),
          "x-component": "CustomInput",
        };
      } else if (type === "textarea") {
        formilySchema.properties[basePath] = {
          type: "string",
          title: content.trim(),
          "x-component": "CustomTextarea",
        };
      }
    });

    return formilySchema;
  }

  // 防止为空
  const content = pDetailData?.data.pdoc?.content ? JSON.parse(pDetailData.data.pdoc.content) : { zh: "", en: "" };
  const markdownContent = content.zh || content.en || "";

  const parsedQuestions = parseMarkdownContent(markdownContent);
  const formilySchema = generateFormilySchema(parsedQuestions);
  console.log(JSON.stringify(formilySchema, null, 2));

  // 编程题选择器
  const availableLangs: Record<string, string> = {
    "cc.cc14o2": "C++",
    "py.py3": "Python",
  };

  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  // 从 pdocConfigLangs 提取特定语言选项，如果没有则使用所有可用选项
  let pdocConfigLangs =
    typeof pDetailData?.data.pdoc?.config === "object" && Array.isArray(pDetailData?.data.pdoc.config.langs)
      ? pDetailData.data.pdoc.config.langs
      : null;

  console.log(pdocConfigLangs);
  const langs = pdocConfigLangs
    ? pdocConfigLangs.filter((lang) => lang in availableLangs)
    : Object.keys(availableLangs);

  const handleButtonClick = (lang: string) => {
    setSelectedLang(lang);
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-4">
        <PageTitle>修炼场 编程题</PageTitle>
        {pDetailData ? (
          <PTop title={pDetailData.data.pdoc.title} pid={pDetailData.data.pdoc.pid} />
        ) : (
          <p>No data available</p>
        )}
        <div className="flex mt-10">
          <div className="w-4/5 border-r-2 pr-4">
            <div>
              <div className="mb-4">
                {pType === "objective" ? (
                  <FormilySchema schema={formilySchema}></FormilySchema>
                ) : (
                  <MarkdownRenderer markdown={markdownContent} />
                )}
              </div>
            </div>

            {pType === "scratch" && (
              <div className="flex flex-col">
                <span className="text-2xl font-bold my-4">请答题</span>
                <span className="text-gray-500 mb-4">选择编译器</span>

                <div className="mb-4">
                  {langs.map((lang) => (
                    <Button
                      key={lang}
                      variant={selectedLang === lang ? undefined : "outline"}
                      className="mr-2 mb-2 justify-start"
                      onClick={() => handleButtonClick(lang)}
                    >
                      {availableLangs[lang as keyof typeof availableLangs]} {/* 使用类型断言 */}
                    </Button>
                  ))}
                </div>
                <CodeEditor value={code} onChange={handleCodeChange} />
              </div>
            )}
          </div>
          <div className="w-1/5 pl-5">
            <PRight />
          </div>
        </div>
        {pType === "objective" ?? <PBottom type={pType!} />}
      </div>
    </div>
  );
};

export default Page;
