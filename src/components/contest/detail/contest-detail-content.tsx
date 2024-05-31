import MarkdownRenderer from "@/components/common/markdown-renderer";
import React from "react";
import media from "@/lib/unified/media";
import { remoteUrl } from "@/lib/utils";
interface PropsType {
  content: string;
  tid: string;
}
const ContestDetailContent: React.FC<PropsType> = (props) => {
  const { content } = props;
  return (
    <>
      <div className={"text-lg font-bold my-8"}>比赛内容</div>
      <MarkdownRenderer
        markdown={content}
        plugins={[
          // {
          //   hookIn: "pre-parse",
          //   plugin: code,
          // },
          {
            hookIn: "pre-parse",
            plugin: media(remoteUrl(""), [{ name: "" }]), //pDetailData.pdoc.additional_file),
          },
        ]}
        className="prose-pdetail"
      ></MarkdownRenderer>
    </>
  );
};
export default ContestDetailContent;
