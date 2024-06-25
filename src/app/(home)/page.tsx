import { TreeItem } from "@/components/common/filter-tabs-tree";
import { type FixedSelectOptions } from "@/components/common/fixed-select";
import { request } from "@/lib/request";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import BulletinBoard from "@/components/common/bulletin-board/index";
import AsideLangSelector from "@/components/home/aside-lang-selector";
import TreeSelector from "@/components/home/tree-selector";
import ProblemListTable from "@/components/home/problem-list-table";
import { type Metadata } from "next";
import PageTitle from "@/components/common/page-title";

export const metadata: Metadata = {
  title: "题库 - CODEMATE",
};

interface PlistItemBase {
  docId: string;
  title: string;
  children?: PlistItemBase[];
}
function getFilterInfo() {
  const parsePlistItem = (item: PlistItemBase) => {
    const _ret: TreeItem = {
      key: item.docId,
      label: item.title,
      children: [],
    };
    if (item.children?.length) {
      _ret.children = item.children.map(parsePlistItem);
    }
    return _ret;
  };
  return request.get("/p-list", {
    transformData: ({ data }) => {
      // 获取语言筛选信息
      const langNames = Array.from(
        new Set(data.UiContext?.domain?.langs?.split(",").map((langId: string) => PROGRAMMING_LANGS[langId]))
      );
      const langOptions = langNames.map((langName) => {
        return {
          label: langName,
          value: Object.keys(PROGRAMMING_LANGS).find((key) => PROGRAMMING_LANGS[key] === langName),
        } as FixedSelectOptions;
      });
      // 获取题单筛选信息
      const treeData = data.roots?.map(parsePlistItem) ?? [];

      return {
        filterTree: [{ key: "", label: "全部" }, ...treeData],
        sideTabs: [{ label: "全部", value: "" }, ...langOptions],
      };
    },
  });
}

function getBulletinCardData() {
  return request.get("/bulletin", {
    params: {
      page: 1,
      limit: 3,
    },
    transformData({ data }) {
      return [
        {
          key: "bulletin",
          label: "重要公告",
          children: data?.bdocs?.map?.((item) => ({
            id: item.docId,
            title: item.title,
            postTime: item.postAt,
            href: `/bulletin/${item.docId}`,
          })),
        },
      ];
    },
  });
}

const HomePage = async () => {
  const { filterTree, sideTabs } = await getFilterInfo();
  const bulletinCardData = await getBulletinCardData();

  return (
    <>
      <PageTitle>修炼场</PageTitle>
      <AsideLangSelector options={sideTabs} />
      <div className="flex w-full space-x-6">
        <div className="flex-1">
          <TreeSelector treeData={filterTree} />
          <ProblemListTable />
        </div>
        <div className="hidden overflow-hidden lg:block lg:w-[250px] xl:w-[300px]">
          <BulletinBoard data={bulletinCardData}></BulletinBoard>
        </div>
      </div>
    </>
  );
};

export default HomePage;
