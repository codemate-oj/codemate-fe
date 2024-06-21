"use client";

import code from "@/lib/unified/code";
import media from "@/lib/unified/media";
import React, { useEffect, useState } from "react";
import { request } from "@/lib/request";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Spin } from "antd";

const MarkdownRenderer = dynamic(() => import("@/components/common/markdown-renderer"), {
  loading: () => <Spin />,
});

function getProblemDetail(pid: string) {
  return request.get(`/p/${pid}` as "/p/{pid}", {
    transformData: (data) => {
      return data;
    },
  });
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

const QuestionDetail: React.FC = React.memo(() => {
  const pathname = usePathname();
  const pid = pathname.split("/").pop();
  const [pdoc, setPdoc] = useState<Awaited<ReturnType<typeof getProblemDetail>>["data"]["pdoc"]>();
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchProblemDetail = async () => {
      const data = await getProblemDetail(pid!);
      setPdoc(data.data.pdoc);
    };

    fetchProblemDetail();
  }, [pid]);
  useEffect(() => {
    setMarkdownContent(extractMarkdownContent(pdoc!));
  }, [pdoc]);

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
          plugin: media(`p/${pdoc?.docId}/file`, pdoc?.additional_file),
        },
      ]}
      className="prose-pdetail"
    />
  );
});

QuestionDetail.displayName = "QuestionDetail";
export default QuestionDetail;
