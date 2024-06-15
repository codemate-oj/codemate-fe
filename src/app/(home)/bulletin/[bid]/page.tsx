import { request } from "@/lib/request";
import { forwardAuthHeader } from "@/lib/forward-auth";
import React, { Suspense } from "react";
import { Metadata } from "next";
import PageTitle from "@/components/common/page-title";
import dayjs from "dayjs";
import Loading from "../../loading";

type Props = {
  params: {
    bid: string;
  };
};

const MarkdownRenderer = React.lazy(() => import("@/components/common/markdown-renderer"));

async function getBulletinDetail(bid: string) {
  return request.get(`/bulletin/${bid}` as "/bulletin/{bid}", {
    transformData: (data) => {
      return data.data.bdoc;
    },
    ...forwardAuthHeader(),
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.bid) throw new Error("No bid provided");
  const bdoc = await getBulletinDetail(params.bid);
  return {
    title: `公告 - ${bdoc.title}`,
  };
}

const BulletinDetailPage = async ({ params }: Props) => {
  if (!params.bid) throw new Error("No bid provided");

  const bdoc = await getBulletinDetail(params.bid!);

  return (
    <div>
      <div className="mx-auto max-w-screen-xl p-4 text-[#3D3D3D]">
        <PageTitle>告示墙 - 公告详情</PageTitle>
        <h3 className="my-5 text-2xl font-bold">{bdoc.title}</h3>
        <div className="flex text-sm">
          <span>关键词：</span>
          <ul className="space-x-1">{bdoc.tags?.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="mt-3 flex gap-x-5 text-sm text-[#B9B9B9]">
          <span>作者：{bdoc.owner}</span>
          <span>发布日期：{dayjs(bdoc.postAt).format("YYYY年MM月DD日 HH:mm:ss")}</span>
        </div>
        <Suspense fallback={<Loading />}>
          <MarkdownRenderer markdown={bdoc.content} className="my-14" />
        </Suspense>
      </div>
    </div>
  );
};

export default BulletinDetailPage;
