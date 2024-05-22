"use client";
import { useEffect, useState } from "react";
import { remark } from "remark"; // 导入 remark
import html from "remark-html"; // 导入 remark-html 插件

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const processMarkdown = async () => {
      const result = await remark().use(html).process(markdown);
      setHtmlContent(result.toString());
    };

    processMarkdown();
  }, [markdown]);

  return <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MarkdownRenderer;
