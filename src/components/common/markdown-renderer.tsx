"use client";
import useSuspensePromise from "@/hooks/useSuspensePromise";
import { useEffect, useMemo, useState } from "react";
import { remark } from "remark"; // 导入 remark
import html from "remark-html"; // 导入 remark-html 插件
import Loading from "../ui/loading";

const renderMarkdown = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    renderMarkdown(markdown).then((content) => {
      setHtmlContent(content);
      setLoaded(true);
    });
  }, [markdown]);

  if (!loaded) return <Loading />;

  return <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MarkdownRenderer;
