import MarkdownRenderer from "@/components/common/markdown-renderer";
import React from "react";
interface PropsType {
  content: string;
}
const ContestDetailContent: React.FC<PropsType> = (props) => {
  const { content } = props;
  return (
    <div className="flex justify-between">
      <div className="w-full ">
        <div className={"text-lg font-bold mb-4"}>比赛内容</div>
        <MarkdownRenderer markdown={content} className="prose-pdetail" />
      </div>
    </div>
  );
};
export default ContestDetailContent;
