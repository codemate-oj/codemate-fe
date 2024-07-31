// TODO: 将这部分逻辑转移到后端kv存储上

interface LabelValueMapItemTYPE {
  label: string;
  key: string;
  children?: LabelValueMapItemTYPE[];
}
type LabelValueMapTYPE = LabelValueMapItemTYPE[];
export const enum labelValueKeyValue {
  "魅神榜" = 0,
  "神犇榜",
  "诸侯赛",
  "模拟测试",
  "专项赛",
  "总榜",
  "图形化金榜",
  "图形化银榜",
  "Python金榜",
  "Python银榜",
  "C++金榜",
  "C++银榜",
}
const alikeChildren: LabelValueMapTYPE = [
  {
    label: "总榜",
    key: String(labelValueKeyValue["总榜"]),
  },
  {
    label: "图形化金榜",
    key: String(labelValueKeyValue["图形化金榜"]),
  },
  {
    label: "图形化银榜",
    key: String(labelValueKeyValue["图形化银榜"]),
  },
  {
    label: "Python金榜",
    key: String(labelValueKeyValue["Python金榜"]),
  },
  {
    label: "Python银榜",
    key: String(labelValueKeyValue["Python银榜"]),
  },
  {
    label: "C++金榜",
    key: String(labelValueKeyValue["C++金榜"]),
  },
  {
    label: "C++银榜",
    key: String(labelValueKeyValue["C++银榜"]),
  },
];
const labelValueMap: LabelValueMapTYPE = [
  {
    label: "魅神榜",
    key: String(labelValueKeyValue["魅神榜"]),
    children: alikeChildren,
  },
  {
    label: "神犇榜",
    key: String(labelValueKeyValue["神犇榜"]),
    children: alikeChildren,
  },
  {
    label: "诸侯赛",
    key: String(labelValueKeyValue["诸侯赛"]),
    children: alikeChildren,
  },
  {
    label: "模拟测试",
    key: String(labelValueKeyValue["模拟测试"]),
    children: alikeChildren,
  },
  {
    label: "专项赛",
    key: String(labelValueKeyValue["专项赛"]),
    children: alikeChildren,
  },
];
export type keyType = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11";
export const searchParamsLabelValueMap = {
  "0": "all",
  "1": "all",
  "2": "all",
  "3": "all",
  "4": "all",
  "5": "all",
  "6": "Cpp",
  "7": "Py",
  "8": "Cpp",
  "9": "Py",
  "10": "Cpp",
  "11": "Py",
};
export default labelValueMap;
