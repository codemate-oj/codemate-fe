"use client";
import React, { useState } from "react";
import { Divider, Button } from "antd";
import { useRequest } from "ahooks";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { request } from "@/lib/request";
// import ProblemTable from "@/components/user/plist/problem-list";
import { ProblemListTable } from "@/components/user/plist/problem";
import HeaderComponent from "@/components/user/plist/head";
import ProblemTable from "@/components/user/plist/problem-list";

type Props = {
  params: {
    tid: string;
  };
};

const UserProblemListPage = ({ params }: Props) => {
  const [page, setPage] = useUrlParamState("page", "1");
  const [pldoc, setPldoc] = useState<unknown>([]);
  const { data: problemListData, loading } = useRequest(
    async () => {
      const { data } = await request.get(`/user-plist/${params.tid!}/detail`, {
        params: {
          page: Number(page),
        },
      });
      setPldoc(data.pldoc);
      return data;
    },
    {
      refreshDeps: [URLSearchParams, page],
    }
  );
  // console.log(problemListData);

  return (
    <div>
      <HeaderComponent title={pldoc?.title} content={pldoc?.content}></HeaderComponent>
      <Divider />
      <ProblemTable
        data={problemListData}
        loading={loading}
        currentPage={Number(page) || 1}
        onPageChange={(page) => setPage(String(page))}
        showButton={false}
      />
      <ProblemListTable></ProblemListTable>;<Button onClick={setPage(1)}></Button>
    </div>
  );
};

export default UserProblemListPage;
