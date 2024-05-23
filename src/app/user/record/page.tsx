"use client";

import SubmitRecords from "@/components/user/record/submit-records";
import { useUrlParam } from "@/hooks/useUrl";
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
    children: null,
  },
  {
    key: "purchases",
    label: "已购",
    children: null,
  },
  {
    key: "favorites",
    label: "收藏",
    children: null,
  },
];

const UserRecordPage = () => {
  const [activeKey, setActiveKey] = useUrlParam("tab", {
    defaultValue: tabItems[0].key,
    validator: (val) => {
      if (!val) return false;
      return tabItems.map((item) => item.key).includes(val);
    },
  });
  return <Tabs className="w-full" items={tabItems} activeKey={activeKey} onChange={setActiveKey} />;
};

export default UserRecordPage;
