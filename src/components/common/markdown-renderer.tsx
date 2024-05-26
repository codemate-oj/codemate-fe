import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import React from "react";
import "katex/dist/katex.min.css"; // 引入 KaTeX 样式

// 定义一个插件，用于将 <h2> 和 <p> 元素包裹在带有 flex 和 items-center 类的 <div> 中
const flexify = () => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (node.type === "heading" && node.depth === 2) {
        const nextNode = parent.children[index + 1];
        if (nextNode && nextNode.type === "paragraph") {
          const flexDiv = {
            type: "element",
            tagName: "div",
            properties: { className: ["flex", "items-center"] },
            children: [node, nextNode],
          };
          parent.children.splice(index, 2, flexDiv);
        } else {
          const flexDiv = {
            type: "element",
            tagName: "div",
            properties: { className: ["flex", "items-center"] },
            children: [node],
          };
          parent.children.splice(index, 1, flexDiv);
        }
      }
    });
  };
};

const renderMarkdown = async (markdown) => {
  const result = await unified()
    .use(remarkParse) // 解析 markdown
    .use(remarkMath) // 支持数学表达式
    .use(flexify) // 使用自定义插件
    .use(remarkRehype, { allowDangerousHtml: true }) // 转换为 HTML
    .use(rehypeKatex) // 解析数学表达式为 KaTeX
    .use(rehypeStringify, { allowDangerousHtml: true }) // 转换为字符串
    .process(markdown);

  return result.toString();
};

const ServerComponent = async ({ markdown }) => {
  const htmlContent = await renderMarkdown(markdown);
  console.log(htmlContent);
  return <div className="prose prose-yellow" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ServerComponent;
