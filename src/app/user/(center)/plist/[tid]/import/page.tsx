"use client";
import React from "react";
import { Divider } from "antd";

import HeaderComponent from "@/components/user/plist/head";
import SingleImport from "@/components/user/plist/import/singleImport";
import MultipleImport from "@/components/user/plist/import/multipleImport";
import { ProblemTable } from "@/components/user/plist/problem-table";

type Props = {
  params: {
    tid: string;
  };
};
// const SingleImport = () => {
// const { data } = useRequest(
//   async () => {
//     const response = await request.get(`/user-plist/${tid}/edit` as "/user-plist/{tid}/edit", {
//       params: {
//         insertPids: [0],
//         deletePids: [0],
//         title: "string",
//         content: "string",
//       },
//     });
//     return response.data.pldoc;
//   }
//   // { refreshDeps: [tid] }
// );
// console.log(data);

//   return (
//     <h2 className="mb-5 flex items-center justify-between font-bold">
//     </h2>
//   );
// };

const UserProblemListPage = ({ params }: Props) => {
  return (
    <div>
      <HeaderComponent tid={params.tid}></HeaderComponent>
      <Divider />
      <div className="mb-8 flex flex-col space-y-4">
        <SingleImport />
        <MultipleImport />
      </div>
      <ProblemTable tid={params.tid}></ProblemTable>
    </div>
  );
};

export default UserProblemListPage;
