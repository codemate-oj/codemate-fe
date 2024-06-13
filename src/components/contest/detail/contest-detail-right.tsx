import { CollapseProps } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
interface ContestDetailRightPropsType {
  tag: string[];
  nickname: string;
  state: string;
  tid: string;
}
const ContestDetailRight: React.FC<ContestDetailRightPropsType> = (props) => {
  const { nickname, state, tid } = props;
  const router = useRouter();
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "比赛类别",
      children: <span className="text-[#FF7D37]">专项赛</span>,
    },
    {
      key: "2",
      label: "比赛阶段",
      children: <span className="text-[#FF7D37]">初赛</span>,
    },
    {
      key: "3",
      label: "举办方",
      children: <span className="text-[#FF7D37]">{nickname}</span>,
    },
    {
      key: "4",
      label: "比赛答疑",
      children: <span className="cursor-pointer text-[#FF7D37]">前往本次比赛答疑专区</span>,
    },
    {
      key: "5",
      label: "赛后总结",
      children: <span className="cursor-pointer text-[#FF7D37]">前往本次比赛赛后总结专区</span>,
    },
    {
      key: "6",
      label: "比赛排名",
      children: (
        <span
          className="text-[#FF7D37] cursor-pointer"
          onClick={() => {
            router.push(`/contest/${tid}/scoreboard`);
          }}
        >
          本次比赛完整排名
        </span>
      ),
    },
  ];
  return (
    <div className={""}>
      {items.map((item) => {
        if ((item.key == "5" || item.key == "6") && state !== "已结束") return null;
        return (
          <div key={item.key}>
            <div className="h-10 w-52 border-b">
              <span className={"border-l-4 border-[#FF7D37] pl-2 text-lg font-bold"}>{item.label}</span>
            </div>
            <div className="my-6">{item.children}</div>
          </div>
        );
      })}
    </div>
  );
};
export default ContestDetailRight;
