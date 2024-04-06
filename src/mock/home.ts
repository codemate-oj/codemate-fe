import { defineMock } from "@alova/mock";

export default defineMock({
  "/home/filter": [
    {
      key: "all",
      label: "全部题库",
    },
    {
      key: "contests",
      label: "赛事题库",
      children: [
        {
          key: "contest-1",
          label: "赛事题库1",
        },
        {
          key: "contest-2",
          label: "赛事题库2",
        },
      ],
    },
  ],
  "/home/filter-aside": [
    {
      key: "all",
      label: "全部语言",
    },
    {
      key: "scratch",
      label: "图形化",
    },
    {
      key: "classic",
      label: "编程题",
      children: [
        { key: "c++", label: "C++" },
        { key: "python", label: "Python" },
      ],
    },
    {
      key: "objective",
      label: "客观题",
    },
  ],
});
