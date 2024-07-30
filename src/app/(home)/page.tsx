import { TreeItem } from "@/components/common/filter-tabs-tree";
import { type FixedSelectOptions } from "@/components/common/fixed-select";
import { request } from "@/lib/request";
import { BRANCH_SLOGAN, PROGRAMMING_LANGS } from "@/constants/misc";
import AsideLangSelector from "@/components/home/aside-lang-selector";
import TreeSelector from "@/components/home/tree-selector";
import ProblemListTable from "@/components/home/problem-list-table";
import { type Metadata } from "next";
import PageTitle from "@/components/common/page-title";
import SideLayout from "@/components/common/side-layout";
import BulletinSidebar from "@/components/common/bulletin-sidebar";

export const metadata: Metadata = {
  title: BRANCH_SLOGAN,
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

const HomePage = async () => {
  const { filterTree, sideTabs } = await getFilterInfo();
  return (
    <>
      <PageTitle>修炼场</PageTitle>
      <AsideLangSelector options={sideTabs} />
      <SideLayout sideComponent={<BulletinSidebar />}>
        <TreeSelector treeData={filterTree} />
        <ProblemListTable />
      </SideLayout>
    </>
  );
};

export default HomePage;
