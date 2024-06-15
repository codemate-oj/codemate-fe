import { TreeItem } from "@/components/common/filter-tabs-tree";
import { type FixedSelectOptions } from "@/components/common/fixed-select";
import { request } from "@/lib/request";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import BulletinBoard, {
  type BulletinCardProps,
  type BullltinItemProps,
} from "@/components/common/bulletin-board/index";
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
      const parseBulletinItem = (item) => {
        const _ret: BullltinItemProps = {
          id: item.docId,
          title: item.title,
          postTime: item.postAt,
          href: `/bulletin/${item.docId}`,
        };
        return _ret;
      };
      return [
        {
          key: "重要公告",
          children: data?.bdocs?.map(parseBulletinItem),
          label: "重要公告",
        },
      ] as BulletinCardProps[];
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
      <div className="w-full flex">
        <div className="md:w-[90vw] lg:w-[60vw] 4xl:max-w-7xl">
          <TreeSelector treeData={filterTree} />
          <ProblemListTable />
        </div>
        <div className="w-[0px] lg:w-[400px] overflow-hidden  ml-[14px]">
          <BulletinBoard data={bulletinCardData as BulletinCardProps[]}></BulletinBoard>
        </div>
      </div>
    </>
  );
};

export default HomePage;
