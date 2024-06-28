import { TreeItem } from "@/components/common/filter-tabs-tree";

export enum ContestTagEnum {
  "CODEMATE争霸赛" = 0,
  "神犇争霸赛",
  "诸侯赛",
  "模拟测试",
  "专项赛",
  "月赛",
  "季赛",
  "年赛",
  "粤澳信息学创新大赛",
}

export const contestFilterTreeData: TreeItem[] = [
  {
    label: "全部",
    key: "",
  },
  {
    label: "CODEMATE争霸赛",
    key: String(ContestTagEnum["CODEMATE争霸赛"]),
  },
  {
    label: "神犇争霸赛",
    key: String(ContestTagEnum["神犇争霸赛"]),
  },
  {
    label: "诸侯赛",
    key: String(ContestTagEnum["诸侯赛"]),
    children: [{ label: "全部", key: "" }],
  },
  {
    label: "模拟测试",
    key: String(ContestTagEnum["模拟测试"]),
    children: [
      {
        label: "全部",
        key: "",
      },
      {
        label: "月赛",
        key: String(ContestTagEnum["月赛"]),
      },
      {
        label: "季赛",
        key: String(ContestTagEnum["季赛"]),
      },
      {
        label: "年赛",
        key: String(ContestTagEnum["年赛"]),
      },
    ],
  },
  {
    label: "专项赛",
    key: String(ContestTagEnum["专项赛"]),
    children: [
      {
        label: "粤澳信息学创新大赛",
        key: String(ContestTagEnum["粤澳信息学创新大赛"]),
      },
    ],
  },
];

export const enum BulletinTagEnum {
  "平台公告" = "平台公告",
  "行业新闻" = "行业新闻",
  "神犇驾到" = "神犇驾到",
}

export const bulletinFilterTreeData: TreeItem[] = [
  {
    label: "平台公告",
    key: String(BulletinTagEnum["平台公告"]),
  },
  {
    label: "行业新闻",
    key: String(BulletinTagEnum["行业新闻"]),
  },
  {
    label: "神犇驾到",
    key: String(BulletinTagEnum["神犇驾到"]),
  },
];
