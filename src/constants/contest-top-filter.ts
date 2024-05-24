interface LabelValueMapItemTYPE {
  label: string;
  key: string;
  children?: LabelValueMapItemTYPE[];
}
type LabelValueMapTYPE = LabelValueMapItemTYPE[];
export const enum labelValueKeyValue {
  "CODEMATE争霸赛" = 0,
  "神犇争霸赛",
  "诸侯赛",
  "模拟测试",
  "专项赛",
  "全部",
  "月赛",
  "季赛",
  "年赛",
  "粤澳信息学创新大赛",
}
const labelValueMap: LabelValueMapTYPE = [
  {
    label: "全部",
    key: String(labelValueKeyValue["全部"]),
  },
  {
    label: "CODEMATE争霸赛",
    key: String(labelValueKeyValue["CODEMATE争霸赛"]),
  },
  {
    label: "神犇争霸赛",
    key: String(labelValueKeyValue["神犇争霸赛"]),
  },
  {
    label: "诸侯赛",
    key: String(labelValueKeyValue["诸侯赛"]),
    children: [{ label: "全部", key: String(labelValueKeyValue["全部"]) }],
  },
  {
    label: "模拟测试",
    key: String(labelValueKeyValue["模拟测试"]),
    children: [
      {
        label: "全部",
        key: String(labelValueKeyValue["全部"]),
      },
      {
        label: "月赛",
        key: String(labelValueKeyValue["月赛"]),
      },
      {
        label: "季赛",
        key: String(labelValueKeyValue["季赛"]),
      },
      {
        label: "年赛",
        key: String(labelValueKeyValue["年赛"]),
      },
    ],
  },
  {
    label: "专项赛",
    key: String(labelValueKeyValue["专项赛"]),
    children: [
      {
        label: "粤澳信息学创新大赛",
        key: String(labelValueKeyValue["粤澳信息学创新大赛"]),
      },
    ],
  },
];
export default labelValueMap;
