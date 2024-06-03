const ContestState: React.FC<{
  isApply: boolean;
  beginAt: string;
  endAt: string;
  checkinBeginAt?: string;
  checkinEndAt?: string;
  styleClassNames?: string;
}> = (props) => {
  const { isApply, beginAt, endAt, checkinBeginAt, checkinEndAt, styleClassNames } = props;
  const nowDate = new Date();
  const beginDate = new Date(beginAt);
  const endDate = new Date(endAt);
  const checkinBeginDate = new Date(checkinBeginAt as string);
  const checkinEndDate = new Date(checkinEndAt as string);

  if (nowDate < checkinBeginDate)
    return <span className={"text-[#FF7D37] border border-[#FF7D37]" + " " + styleClassNames}>预告中</span>;
  else if (nowDate < beginDate)
    return (
      <span className={" text-white border border-[#FF7D37] bg-[#FF7D37]" + " " + styleClassNames}>
        {isApply ? "已报名（未开始）" : "可报名"}
      </span>
    );
  else if (nowDate < checkinEndDate)
    return (
      <span className={"text-white  border border-[#0256FF] bg-[#0256FF]" + " " + styleClassNames}>
        {isApply ? "已报名（进行中）" : "进行中"}
      </span>
    );
  else if (nowDate < endDate)
    return (
      <span className={" text-white border border-[#0256FF] bg-[#0256FF]" + " " + styleClassNames}>
        {isApply ? "已报名（进行中）" : "进行中"}
      </span>
    );
  else
    return <span className={"text-white border border-[#3D3D3D] bg-[#3D3D3D] " + " " + styleClassNames}>已结束</span>;
};
export default ContestState;
