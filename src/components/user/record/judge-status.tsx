import { STATUS_ICONS, STATUS_TEXT_COLORS, STATUS_TEXTS, StatusType } from "@/constants/judge-status";
import { Icon } from "@iconify/react";
import React from "react";

interface IProps {
  statusCode: StatusType;
  score?: number;
}

const JudgeStatus: React.FC<IProps> = ({ statusCode, score }) => {
  return (
    <div className={`text-${STATUS_TEXT_COLORS[statusCode]} flex items-center gap-1`}>
      <Icon width={16} height={16} icon={STATUS_ICONS[statusCode]} />
      {score && <div>{score}</div>}
      <div>{STATUS_TEXTS[statusCode]}</div>
    </div>
  );
};

export default JudgeStatus;
