"use client";
import React from "react";
import { Divider } from "antd";
// import { useRequest } from "ahooks";
// import { useUrlParamState } from "@/hooks/useUrlParamState";
// import { request } from "@/lib/request";

import HeaderComponent from "@/components/user/plist/head";
// import { ProblemTable } from "@/components/user/plist/problem-table";

type Props = {
  params: {
    tid: string;
  };
};

const UserProblemListPage = ({ params }: Props) => {
  return (
    <div>
      <HeaderComponent tid={params.tid}></HeaderComponent>
      <Divider />
      {/* <ProblemTable tid={params.tid}></ProblemTable> */}
    </div>
  );
};

export default UserProblemListPage;
