import type { getContestState } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface IProps {
  isApply: boolean;
  status: ReturnType<typeof getContestState>;
  tdoc: {
    docId: string;
  };
  onApply?: () => void;
}

const ActionButton: React.FC<IProps> = ({ isApply, status, tdoc, onApply }) => {
  if (isApply) {
    if (status == "进行中") {
      return (
        <Link
          href={`/contest/${tdoc.docId}/problems`}
          target="_blank"
          className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white"
        >
          开始做题
        </Link>
      );
    } else if (status == "已结束") {
      return (
        <Link
          href={`/contest/${tdoc.docId}/problems`}
          target="_blank"
          className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white"
        >
          查看结果
        </Link>
      );
    } else {
      return (
        <span className="cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white">
          已报名
        </span>
      );
    }
  } else {
    if (status == "预告中") {
      return null;
    } else if (status == "可报名" || status == "进行中") {
      return (
        <span
          className="cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white"
          onClick={onApply}
        >
          马上报名
        </span>
      );
    } else {
      return (
        <span className="cursor-not-allowed rounded-lg border border-[#706f6e] bg-[#706f6e] px-4 py-2 text-sm font-normal text-white">
          报名已结束
        </span>
      );
    }
  }
};

export default ActionButton;
