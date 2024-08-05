import { request } from "@/lib/request";
import type { Metadata } from "next";
import { forwardAuthHeader } from "@/lib/forward-auth";
import React from "react";
import App from "./App";

type Props = {
  params: {
    pid: string;
  };
  searchParams: {
    tid?: string;
    fromContest?: string;
  };
};

async function getProblemDetail(pid: string, tid?: string) {
  try {
    return await request.get(`/p/${pid}` as "/p/{pid}", {
      params: {
        tid,
      },
      transformData: (data) => {
        return data.data;
      },
      ...forwardAuthHeader(),
    });
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.pid) throw new Error("No pid provided");
  const data = await getProblemDetail(params.pid);
  return {
    title: `题目详情 ${data ? `- ${data.title}` : ""}`,
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const { pid } = params;
  const { tid, fromContest } = searchParams;
  const isFromContest = Boolean(fromContest === "true" && tid);
  const response = await getProblemDetail(pid, isFromContest ? tid : undefined);

  return <App pid={params.pid} prefetchValue={response} tid={tid} fromContest={isFromContest} />;
};

export default Page;
