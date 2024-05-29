import MarkdownRenderer from "@/components/common/markdown-renderer";
import React from "react";
interface PropsType {
  content: string;
  importanceContent: string;
}
const ContestDetailContent: React.FC<PropsType> = (props) => {
  const { content, importanceContent } = props;
  return (
    <>
      <div className={"text-lg font-bold my-4"}>重要信息</div>
      <MarkdownRenderer markdown={importanceContent}></MarkdownRenderer>
      <div className={"text-lg font-bold my-4"}>比赛内容</div>
      <MarkdownRenderer markdown={content}></MarkdownRenderer>
    </>
  );
};
export default ContestDetailContent;
