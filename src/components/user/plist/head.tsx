"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";

interface HeaderProps {
  tid: string;
}

const HeaderComponent: React.FC<HeaderProps> = ({ tid }) => {
  const { data: problemListData = {} } = useRequest(
    async () => {
      const { data } = await request.get(`/user-plist/${tid}/detail` as "/user-plist/{tid}/detail", {
        params: {
          page: 1,
        },
      });
      return data.pldoc;
    },
    {
      refreshDeps: [tid],
    }
  );

  return (
    <div className="mb-4 flex items-center justify-between rounded bg-white p-4 shadow-md">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">{problemListData.title || "题单名"}</h1>
        <span className="ml-4 text-gray-500">{problemListData.content || "题单描述"}</span>
      </div>
      <Link href={`/user/plist/${tid}/detail`}>
        <Image src="/svg/app-user-plist-editIcon.svg" alt="editQuiz" width={20} height={24} />
      </Link>
    </div>
  );
};

export default HeaderComponent;
