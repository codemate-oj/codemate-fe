"use client";
import { ProblemListTable } from "@/components/user/plist/problem";
import ProblemTable from "@/components/user/plist/problem-list";
import { Divider } from "antd";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import { useUrlParamState } from "@/hooks/useUrlParamState";

const UserProblemListPage: React.FC = () => {
  const [page, setPage] = useUrlParamState("page", "1");

  const { data: problemListData, loading } = useRequest(
    async () => {
      const { data } = await request.get(`/user-plist/${params.tid!}/detail`, {
        params: {
          page: Number(page),
        },
      });
      return [data.pldoc].map((item: { _id: unknown }) => ({ ...item, key: item._id }));
    },
    {
      refreshDeps: [URLSearchParams, page],
    }
  );
  return (
    <div>
      <Divider />
      <ProblemTable
        data={problemListData}
        loading={loading}
        currentPage={Number(page) || 1}
        onPageChange={(page) => setPage(String(page))}
        showButton={false}
      />
      <Divider />
      <ProblemListTable></ProblemListTable>;
    </div>
  );
};

export default UserProblemListPage;
