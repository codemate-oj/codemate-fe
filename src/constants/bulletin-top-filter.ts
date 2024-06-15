interface LabelValueMapItemTYPE {
  label: string;
  key: string;
  children?: LabelValueMapItemTYPE[];
}
type LabelValueMapTYPE = LabelValueMapItemTYPE[];
export const enum labelValueKeyValue {
  "平台公告" = "平台公告",
  "行业新闻" = "行业新闻",
  "神犇驾到" = "神犇驾到",
}
const labelValueMap: LabelValueMapTYPE = [
  {
    label: "平台公告",
    key: String(labelValueKeyValue["平台公告"]),
  },
  {
    label: "行业新闻",
    key: String(labelValueKeyValue["行业新闻"]),
  },
  {
    label: "神犇驾到",
    key: String(labelValueKeyValue["神犇驾到"]),
  },
];
export default labelValueMap;
