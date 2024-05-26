"use client";
import React, { useMemo } from "react";
import FilterTabsTree, { FilterTabsTreeData, type TreeItem } from "../common/filter-tabs-tree";
import { useUrlParam } from "@/hooks/useUrl";

interface Props {
  treeData: FilterTabsTreeData;
}

const TreeSelector: React.FC<Props> = ({ treeData }) => {
  const [tid, setTid] = useUrlParam("tid");

  const selectedTreePath = useMemo(() => {
    if (!treeData || !tid) return [];
    let currentSelectedKeysPath: string[] = [];
    const traverse = (node: TreeItem[], path: string[] = []) => {
      for (const item of node) {
        const newPath = [...path, item.key];
        if (item.key === tid) {
          currentSelectedKeysPath = newPath;
          return;
        }
        if (item.children) {
          traverse(item.children, newPath);
        }
      }
    };
    traverse(treeData);
    return currentSelectedKeysPath;
  }, [tid]);

  return (
    <FilterTabsTree
      data={treeData}
      selectedPath={selectedTreePath}
      onChange={(treePath) => {
        setTid(treePath[treePath.length - 1]);
      }}
    />
  );
};

export default TreeSelector;
