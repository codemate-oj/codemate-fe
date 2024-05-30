"use client";

import FaultList from "@/components/user/record/fault-list";
import StarredList from "@/components/user/record/starred-list";
import SubmitRecords from "@/components/user/record/submit-records";
import { useUrlParamState } from "@/hooks/useUrlParamState";
import { Tabs, type TabsProps } from "antd";
import React from "react";

const tabItems: TabsProps["items"] = [
  {
    key: "records",
    label: "答题记录",
    children: <SubmitRecords />,
  },
  {
    key: "faults",
    label: "错题",
    children: <FaultList />,
  },
  {
    key: "purchases",
    label: "已购",
    children: null,
  },
  {
    key: "favorites",
    label: "收藏",
    children: <StarredList />,
  },
];

const UserRecordPage = () => {
  const [activeKey, setActiveKey] = useUrlParamState("tab", tabItems[0].key);
  return <Tabs className="w-full" items={tabItems} activeKey={activeKey} onChange={setActiveKey} />;
};

export default UserRecordPage;
