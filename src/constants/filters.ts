import { TreeItem } from "@/components/common/filter-tabs-tree";

export enum ContestTagEnum {
  "AIOJ争霸赛" = 0,
  "神犇争霸赛",
  "诸侯赛",
  "模拟测试",
  "专项赛",
  "月赛",
  "季赛",
  "总决赛",
  "春蒐(sōu)赛",
  "夏苗赛",
  "秋狝(xiǎn)赛",
  "冬狩(shòu)赛",
  "粤港澳大赛",
  "GESP",
  "电子学会",
  "蓝桥杯",
  "CSP-J/S",
}

export const contestFilterTreeData: TreeItem[] = [
  {
    label: "全部",
    key: "",
  },
  {
    label: "AIOJ争霸赛",
    key: String(ContestTagEnum["AIOJ争霸赛"]),
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
        label: "总决赛",
        key: String(ContestTagEnum["总决赛"]),
      },
    ],
  },
  {
    label: "神犇争霸赛",
    key: String(ContestTagEnum["神犇争霸赛"]),
    children: [
      {
        label: "全部",
        key: "",
      },
      {
        label: "春蒐(sōu)赛",
        key: String(ContestTagEnum["春蒐(sōu)赛"]),
      },
      {
        label: "夏苗赛",
        key: String(ContestTagEnum["夏苗赛"]),
      },
      {
        label: "秋狝(xiǎn)赛",
        key: String(ContestTagEnum["秋狝(xiǎn)赛"]),
      },
      {
        label: "冬狩(shòu)赛",
        key: String(ContestTagEnum["冬狩(shòu)赛"]),
      },
    ],
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
        label: "GESP",
        key: String(ContestTagEnum["GESP"]),
      },
      {
        label: "电子学会",
        key: String(ContestTagEnum["电子学会"]),
      },
      {
        label: "蓝桥杯",
        key: String(ContestTagEnum["蓝桥杯"]),
      },
      {
        label: "CSP-J/S",
        key: String(ContestTagEnum["CSP-J/S"]),
      },
    ],
  },
  {
    label: "专项赛",
    key: String(ContestTagEnum["专项赛"]),
    children: [
      {
        label: "粤港澳大赛",
        key: String(ContestTagEnum["粤港澳大赛"]),
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
