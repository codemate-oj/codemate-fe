import React from "react";
import { FilterTabsTreeData } from "../common/filter-tabs-tree";
import { useUrlParam } from "@/hooks/useUrl";

interface Props {
  treeData: FilterTabsTreeData;
}

const TreeSelector = () => {
  const [tid, setTid] = useUrlParam("tid");
  return <div>TreeSelector</div>;
};

export default TreeSelector;
