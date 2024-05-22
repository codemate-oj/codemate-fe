"use client";
import React, { useEffect, useState } from "react";
import FilterTabsTree, { FilterTabsTreeData, type TreeItem } from "../common/filter-tabs-tree";
import { useUrlParam } from "@/hooks/useUrl";

interface Props {
  treeData: FilterTabsTreeData;
}

const TreeSelector: React.FC<Props> = ({ treeData }) => {
  const [tid, setTid] = useUrlParam("tid");
  const [selectedTreePath, setSelectedTreePath] = useState<string[]>([]);

  useEffect(() => {
    if (!treeData || !tid) return;
    const getInfoByKey = (key: string) => {
      let isLastNode = false;
      let currentSelectedKeysPath: string[] = [];

      const traverse = (node: TreeItem[], path: string[]) => {
        for (const item of node) {
          const newPath = [...path, item.key];
          if (item.key === key) {
            if (!item.children || item.children.length === 0) {
              isLastNode = true;
            }
            currentSelectedKeysPath = newPath;
            return;
          }
          if (item.children) {
            traverse(item.children, newPath);
          }
        }
      };

      traverse(treeData, []);
      return { isLastNode, currentSelectedKeysPath };
    };
    const info = getInfoByKey(tid);
    setSelectedTreePath(info.currentSelectedKeysPath);
  }, [treeData]);

  return (
    <FilterTabsTree
      data={treeData}
      selectedPath={selectedTreePath}
      onChange={(treePath) => {
        setSelectedTreePath(treePath);
        setTid(treePath[treePath.length - 1]);
      }}
    />
  );
};

export default TreeSelector;
