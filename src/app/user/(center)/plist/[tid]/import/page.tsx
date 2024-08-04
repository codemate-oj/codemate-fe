"use client";
import { ProblemListTable } from "@/components/user/plist/problem";
import ProblemTable from "@/components/user/plist/problem-list";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { Button, Input, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
      />
      <Divider />
      <div className="mb-4 flex items-center">
        <div className="mr-4 flex flex-col items-start">
          <label htmlFor="single-upload" className="mb-1 text-gray-700">
            单题导入
          </label>
          <Input placeholder="请输入单题编号" id="single-upload" className="w-64" />
        </div>
        <Button type="primary" className="border-none bg-orange-500 hover:bg-orange-400">
          确认导入
        </Button>
        <Button danger className="ml-4 flex items-center border border-gray-300 text-gray-700">
          <DeleteOutlined className="mr-1" /> 删除
        </Button>
      </div>
      <ProblemListTable></ProblemListTable>;
    </div>
  );
};

export default UserProblemListPage;
