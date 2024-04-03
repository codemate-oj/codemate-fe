"use client";
import FilerTabsTree, { TreeItem } from "@/components/common/filter-tabs-tree";
import React from "react";

const treeData: TreeItem[] = [
  {
    key: "parent 1",
    label: "parent 1",
    children: [
      {
        key: "parent 1-0",
        label: "parent 1-0",
        children: [
          {
            key: "leaf1",
            label: "leaf1",
          },
          {
            key: "leaf2",
            label: "leaf2",
          },
        ],
      },
      {
        key: "parent 1-1",
        label: "parent 1-1",
        children: [
          {
            key: "leaf3",
            label: "leaf3",
          },
        ],
      },
    ],
  },
  {
    key: "parent 2",
    label: "parent 2",
    children: [
      {
        key: "parent 2-0",
        label: "parent 2-0",
        children: [
          {
            key: "leaf1",
            label: "leaf1",
          },
          {
            key: "leaf2231123",
            label: "leaf2",
            children: [
              {
                key: "33",
                label: "33",
              },
            ],
          },
        ],
      },
      {
        key: "parent 2131232-2",
        label: "parent 2-1",
        children: [
          {
            key: "leaf1232133",
            label: "leaf3",
            children: [
              {
                key: "333213",
                label: "33",
              },
            ],
          },
        ],
      },
    ],
  },
];
const HomePage = () => {
  return (
    <>
      <div>修炼场</div>
      <FilerTabsTree
        filerTabsTreeData={treeData}
        onChange={(i) => console.log(i, "onChange")}
        defaultActiveKey="333213"
      ></FilerTabsTree>
    </>
  );
};

export default HomePage;
