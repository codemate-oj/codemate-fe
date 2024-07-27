"use client";
import React from "react";
import Link from "next/link";
import { getScoreColor } from "@/lib/utils";

export interface RdocType {
  pid?: string;
  uname?: string;
  score: number;
  subtime?: string;
  title?: string;
}

interface IProps {
  data?: RdocType;
}

const RecordUserTab: React.FC<IProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-wrap justify-around bg-[#F9F9F9] py-1.5 text-[#797979]">
      <div>
        <span>递交者: </span>
        <span>{data.uname}</span>
      </div>
      <div>
        <span>题目：</span>
        <Link href={`/p/${data?.pid}`} target="_blank" className="hover:underline">
          {data.pid} - {data.title}
        </Link>
      </div>
      <div>
        <span>递交时间：</span>
        <span>{data.subtime}</span>
      </div>
      <div>
        <span>分数: </span>
        <span style={{ color: getScoreColor(data.score) }}>{data.score}</span>
      </div>
    </div>
  );
};

export default RecordUserTab;
