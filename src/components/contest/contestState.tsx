const ContestState: React.FC<{
  isApply: boolean;
  beginAt: string;
  endAt: string;
  checkinBeginAt: string;
  checkinEndAt: string;
}> = (props) => {
  const { isApply, beginAt, endAt, checkinBeginAt, checkinEndAt } = props;
  const nowDate = new Date();
  const beginDate = new Date(beginAt);
  const endDate = new Date(endAt);
  const checkinBeginDate = new Date(checkinBeginAt);
  const checkinEndDate = new Date(checkinEndAt);
  if (nowDate < checkinBeginDate)
    return (
      <span className="absolute top-2 right-2 text-[#FF7D37] border border-[#FF7D37] rounded-lg py-2 px-4 text-sm font-normal">
        预告中
      </span>
    );
  else if (nowDate < beginDate)
    return (
      <span className="absolute top-2 right-2 text-white border border-[#FF7D37] bg-[#FF7D37] rounded-lg py-2 px-4 text-sm font-normal">
        {isApply ? "已报名（未开始）" : "可报名"}
      </span>
    );
  else if (nowDate < checkinEndDate)
    return (
      <span className="absolute top-2 right-2 text-white border border-[#0256FF] bg-[#0256FF] rounded-lg py-2 px-4 text-sm font-normal">
        {isApply ? "已报名（进行中）" : "进行中"}
      </span>
    );
  else if (nowDate < endDate)
    return (
      <span className="absolute top-2 right-2 text-white border border-[#0256FF] bg-[#0256FF] rounded-lg py-2 px-4 text-sm font-normal">
        {isApply ? "已报名（进行中）" : "进行中"}
      </span>
    );
  else
    return (
      <span className="absolute top-2 right-2 text-white border border-[#3D3D3D] bg-[#3D3D3D] rounded-lg py-2 px-4 text-sm font-normal">
        已结束
      </span>
    );
};
export default ContestState;
