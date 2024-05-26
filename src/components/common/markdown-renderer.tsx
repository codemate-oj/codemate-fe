import { type Plugin, unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import React from "react";
import "katex/dist/katex.min.css"; // 引入 KaTeX 样式
import { cn } from "@/lib/utils";

interface IUnifiedPlugin {
  hookIn: "pre-parse" | "post-parse" | "pre-render" | "post-render";
  plugin: Plugin;
}

const renderMarkdown = async (markdown: string, plugins: IUnifiedPlugin[] = []) => {
  const preParsePlugins = plugins.filter((plugin) => plugin.hookIn === "pre-parse");
  const postParsePlugins = plugins.filter((plugin) => plugin.hookIn === "post-parse");
  const preRenderPlugins = plugins.filter((plugin) => plugin.hookIn === "pre-render");
  const postRenderPlugins = plugins.filter((plugin) => plugin.hookIn === "post-render");

  const processor = unified()
    .use(preParsePlugins.map((plugin) => plugin.plugin)) // 加入per-parse插件
    .use(remarkParse) // 解析 markdown
    .use(remarkMath) // 支持数学表达式
    .use(postParsePlugins.map((plugin) => plugin.plugin)) // 加入post-parse插件
    .use(remarkRehype, { allowDangerousHtml: true }) // 转换为 HTML
    .use(rehypeKatex) // 解析数学表达式为 KaTeX
    .use(preRenderPlugins.map((plugin) => plugin.plugin)) // 加入pre-render插件
    .use(rehypeStringify, { allowDangerousHtml: true }) // 转换为字符串
    .use(postRenderPlugins.map((plugin) => plugin.plugin)); // 加入post-render插件

  const result = await processor.process(markdown);
  return result.toString();
};

interface MarkdownRendererProps {
  markdown: string;
  plugins?: IUnifiedPlugin[];
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = async ({ markdown, plugins, className }) => {
  const htmlContent = await renderMarkdown(markdown, plugins);

  return <div className={cn("prose", className)} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MarkdownRenderer;
