"use client";
import { cn } from "@/lib/utils";
import { Tabs } from "antd";
import React, { useEffect, useMemo, useState } from "react";

export type TreeItem = {
  key: string;
  label: React.ReactNode;
  children?: TreeItem[];
};
export type FilterTabsTreeData = TreeItem[];

export interface FilterTabsTreeProps {
  data: FilterTabsTreeData;
  depth?: number;
  selectedPath?: string[];
  onChange?: (selectedPath: string[]) => void;
  renderers?: React.FC<FilterTabsTreeRendererProps>[];
}

export interface FilterTabsTreeRendererProps {
  data: FilterTabsTreeData;
  selectedKey?: string;
  onChange?: (key: string) => void;
}

export const TabRenderer: React.FC<FilterTabsTreeRendererProps> = ({ data, selectedKey, onChange }) => {
  return (
    <Tabs
      activeKey={selectedKey}
      items={data.map((item) => ({
        label: item.label,
        key: item.key,
      }))}
      onChange={onChange}
    />
  );
};

export const TagRenderer: React.FC<FilterTabsTreeRendererProps> = ({ data, selectedKey, onChange }) => {
  return (
    <div className="flex gap-5 py-2">
      {data.map(({ label, key }) => {
        const isActive = key === selectedKey;
        return (
          <button
            key={key}
            className={cn("block text-sm rounded-[8px] px-[5px] py-[3px] text-[#797979]", {
              "bg-primary text-white font-bold": isActive,
            })}
            onClick={() => {
              onChange?.(key);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export const TextRenderer: React.FC<FilterTabsTreeRendererProps> = ({ data, selectedKey, onChange }) => {
  return (
    <div className="flex gap-5 py-2">
      {data.map(({ label, key }) => {
        const isActive = key === selectedKey;
        return (
          <button
            key={key}
            className={cn("block text-sm px-[5px] py-[3px] text-[#797979]", {
              "text-primary": isActive,
            })}
            onClick={() => {
              onChange?.(key);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const FilterTabsTree: React.FC<FilterTabsTreeProps> = ({
  data,
  depth = 0,
  selectedPath,
  onChange,
  renderers = [TabRenderer, TagRenderer, TextRenderer],
}) => {
  const [activeKey, setActiveKey] = useState<string>("");
  const handleChildrenChange: typeof onChange = (subPath) => {
    onChange?.([activeKey, ...subPath]);
  };

  const handleClickTab = (key: string) => {
    setActiveKey(key);
    onChange?.([key]);
  };

  const Renderer = useMemo<React.FC<FilterTabsTreeRendererProps>>(() => {
    const index = Math.min(depth, renderers.length - 1);
    return index < 0 ? TabRenderer : renderers[index];
  }, [depth, renderers]);

  const subData = useMemo(() => {
    const subData = data.find((item) => item.key === activeKey);
    return subData?.children ?? [];
  }, [data, activeKey]);

  useEffect(() => {
    if (selectedPath) {
      setActiveKey(selectedPath[0] ?? "");
    }
  }, [selectedPath]);

  return (
    <>
      <Renderer data={data} selectedKey={activeKey} onChange={handleClickTab} />
      {subData && subData.length > 0 && (
        <FilterTabsTree
          data={subData}
          selectedPath={selectedPath?.slice(1)}
          depth={depth + 1}
          onChange={handleChildrenChange}
          renderers={renderers}
        />
      )}
    </>
  );
};

export default FilterTabsTree;
