/**
 * @Date        2024/06/30 11:42:46
 * @Author      zono
 * @Description 教培机构页
 * */
import PageTitle from "@/components/common/page-title";
import Image from "next/image";
import React from "react";

const TrainingOrgAssessment = () => {
  return (
    <div>
      <PageTitle>商务合作</PageTitle>
      <article className="prose prose-h1:text-xl">
        <div className="text-center text-red-600">
          <p>
            特别说明：本平台不涉及任何线下或线上教育培训业务，仅为编程学习提供助力信息学学习的智能化刷题和竞赛工具。
          </p>
        </div>
        <h1 className="font-bold text-orange-600">
          如果贵单位是开展信息学课程的教培机构（中小学），CODEMATE可以为您做什么？
        </h1>
        <ol className="ml-6 list-decimal">
          <li>
            <strong>共享共建海量优质题库</strong>
            即日起支持CODEMATE的海量免费题目。选择性众多优质原创题目，又可有偿分享私有题库到公共平台，让所有的知识价值得到体现。
          </li>
          <li>
            <strong>完善的智能化训练后测和题库系统</strong>
            每周新增可以从海量题库中选择垂直方向分组不同小组，定时公开、限时完成、丰富的数据统计精准了解后测练习效果。
          </li>
          <li>
            <strong>组队参赛实现技能提升</strong>
            通过CODEMATE竞赛技能稳定广覆盖，同时为启用开放与众多友校举行高层联赛进行打比赛、极力提高学校信息学影响力和知名度；
          </li>
          <li>
            <strong>银牌赛和激励心模式</strong>
            可参加平台内外众多比赛，充分锻炼学生的责任技能，支持每天百万数据提交，每秒百次峰值数据提交，综合表现位于O行业遥遥领先；
          </li>
          <li>
            <strong>更智能也公平更省心</strong>
            AIB评估系统让学生质量统计也能保持公平，平台智能评测，快速出题集，极大减少比赛难度和运营成本；
          </li>
          <li>
            <strong>优秀师资和品牌双重曝光</strong>
            如果贵单位有优秀的老师，我们将会倍邀请参与题解建设、知识点视频、技巧分享视频等内容建设，可带单位品牌强势出现在全国千万编程平台。
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
        </div>
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

export default TrainingOrgAssessment;
