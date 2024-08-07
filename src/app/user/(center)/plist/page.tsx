"use client";
import React from "react";
import { Divider } from "antd";

import ProblemTable from "@/components/user/plist/problem-list-table";

const UserProblemListPage = () => {
  return (
    <div>
      <Divider />
      <ProblemTable />
    </div>
  );
};

export default UserProblemListPage;
