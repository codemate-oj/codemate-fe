"use client";
import type { TreeItem } from "@/components/common/filter-tabs-tree";
import FilterTabsTree from "@/components/common/filter-tabs-tree";
import type { FixedSelectOptions } from "@/components/common/fixed-select";
import FixedSelect from "@/components/common/fixed-select";
import ProblemListTable from "@/components/home/problem-list-table";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import React, { useMemo } from "react";

interface IProps {
  filterTree?: TreeItem[];
  sideTabs?: FixedSelectOptions[];
}

export const DEFAULT_PLIST_ID = "66200c489cd74d3e4c931302";

const App: React.FC<IProps> = ({ filterTree, sideTabs }) => {
  const [lang, setLang] = useUrlParamState("lang");
  const [tid, setTid] = useUrlParamState("tid", DEFAULT_PLIST_ID);

  const selectedTreePath = useMemo(() => {
    if (!filterTree || !tid) return [];
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
    traverse(filterTree);
    return currentSelectedKeysPath;
  }, [tid, filterTree]);

  return (
    <>
      {sideTabs && <FixedSelect options={sideTabs} onSelect={(lang) => setLang(lang)} defaultSelectedValue={lang} />}
      {filterTree && (
        <FilterTabsTree
          data={filterTree}
          selectedPath={selectedTreePath}
          onChange={(treePath) => {
            setTid(treePath[treePath.length - 1]);
          }}
        />
      )}
      <ProblemListTable tid={tid} lang={lang} />
    </>
  );
};

export default App;
