import { SideFilterOptions } from "@/components/common/side-filter";
import { type FilerTabsTreeData } from "@/components/common/filter-tabs-tree";

export type CONTEST_STATUS_VAL = "incoming" | "ready" | "ongoing" | "done";

export const CONTEST_STATUS: SideFilterOptions[] = [
  {
    label: "预告中",
    value: "incoming",
  },
  {
    label: "报名中",
    value: "ready",
  },
  {
    label: "进行中",
    value: "ongoing",
  },
  {
    label: "已结束",
    value: "done",
  },
];

export const CONTEST_FILTER: FilerTabsTreeData = [
  {
    key: "all",
    label: "全部",
    children: [
      {
        key: "all,month",
        label: "月赛",
      },
      {
        key: "all,season",
        label: "季赛",
      },
      {
        key: "all,final",
        label: "总决赛",
      },
    ],
  },
  {
    key: "codemate",
    label: "codemate全国争霸赛",
    children: [
      {
        key: "codemate,month",
        label: "月赛",
      },
      {
        key: "codemate,season",
        label: "季赛",
      },
      {
        key: "codemate,final",
        label: "总决赛",
      },
    ],
  },
  {
    key: "meishen",
    label: "魅神全国邀请赛",
    children: [
      {
        key: "meishen,month",
        label: "月赛",
      },
      {
        key: "meishen,season",
        label: "季赛",
      },
      {
        key: "meishen,final",
        label: "总决赛",
      },
    ],
  },
  {
    key: "special",
    label: "专项赛",
    children: [
      {
        key: "special,month",
        label: "月赛",
      },
      {
        key: "special,season",
        label: "季赛",
      },
      {
        key: "special,final",
        label: "总决赛",
      },
    ],
  },
];

export const CONTEST_FILTER_DIR = {
  month: "月赛",
  season: "季赛",
  final: "总决赛",
  all: "全部",
  codemate: "codemate全国争霸赛",
  meishen: "魅神全国邀请赛",
  special: "专项赛",
};
