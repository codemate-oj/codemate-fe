/**
 * @Date        2024/06/30 12:11:21
 * @Author      zono
 * @Description 赛事委托页
 * */
import PageTitle from "@/components/common/page-title";
import Image from "next/image";
import React from "react";

const GameDelegateAssessment = () => {
  return (
    <div>
      <PageTitle>商务合作</PageTitle>
      <article className="prose prose-h1:text-xl">
        <h1 className="text-left text-xl font-bold text-orange-600">
          如果您是编程赛事主办方或承办方，CODEMATE可以为您做什么？
        </h1>
        <ol className="ml-6 list-decimal">
          <li>
            <strong>更纯粹更高要求赛事</strong>
            不限语言、不限题型、不断创新，中大型赛事题库多重审核、按难度输出、精准统计；
          </li>
          <li>
            <strong>更高效技术心优模式</strong>可容纳百万用户同时在线提交，单日分块统计数据支持百万人在线提交；
          </li>
          <li>
            <strong>更高效运维模式</strong>
            AIB评估系统让赛事成绩统计也能保持公平，平台智能评测，快速出题集，极大减少比赛难度和运营成本。
          </li>
        </ol>
        <h2 className="mt-6 text-lg font-bold">系统承载核心数据</h2>
        <ol className="ml-6 list-decimal">
          <li>系统层面支持100万提交/天的长时期吞吐量和100提交/秒的峰值吞吐量。</li>
          <li>系统层面支持100MB/秒的平均数据存储和2GB/秒的峰值数据存储和调用度。</li>
          <li>技术上支持5万活跃用户（每月离访访问量）。</li>
          <li>可容纳所有存储用户超过100万。</li>
        </ol>
        <div className="mt-6 border-t-2 border-gray-300 pt-4">
          <h2 className="text-lg font-bold">商务合作专属客服</h2>
          <p>M小姐TEL: 18922852573（同微信）E: sw01@codemate.cc</p>
        </div>
        <div className="mt-6 border-t-2 border-gray-300 pt-4">
          <h2 className="text-lg font-bold">CODEMATE的平合优势概述</h2>
        </div>{" "}
      </article>
      <div className="space-y-4">
        <Image src={`/img/trade_collaboration/1.png`} alt="123" width={600} height={200} />
        <Image src={`/img/trade_collaboration/2.png`} alt="123" width={600} height={200} />
        <Image src={`/img/trade_collaboration/3.png`} alt="123" width={600} height={200} />
        <Image src={`/img/trade_collaboration/4.png`} alt="123" width={600} height={200} />
      </div>
      <div className="mt-8 flex justify-center">
        <button className="mr-4 rounded bg-orange-500 px-4 py-2 text-white">观看宣传片</button>
        <button className="rounded border border-orange-500 px-4 py-2 text-orange-500">
          更多技术资料请咨询工作人员
        </button>
      </div>
    </div>
  );
};

export default GameDelegateAssessment;
