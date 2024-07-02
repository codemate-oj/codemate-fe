import { cn, type getContestState } from "@/lib/utils";

const ContestState: React.FC<{
  isApply: boolean;
  status: ReturnType<typeof getContestState>;
  className?: string;
}> = ({ isApply, status, className }) => {
  if (status === "预告中")
    return <span className={cn("border border-[#FF7D37] text-[#FF7D37]", className)}>预告中</span>;
  else if (status === "可报名")
    return (
      <span className={cn("border border-[#FF7D37] bg-[#FF7D37] text-white", className)}>
        {isApply ? "已报名（未开始）" : "可报名"}
      </span>
    );
  else if (status === "进行中")
    return (
      <span className={cn("border border-[#0256FF] bg-[#0256FF] text-white", className)}>
        {isApply ? "已报名（进行中）" : "进行中"}
      </span>
    );
  else return <span className={cn("border border-[#3D3D3D] bg-[#3D3D3D] text-white", className)}>已结束</span>;
};

export default ContestState;
