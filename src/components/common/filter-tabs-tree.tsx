"use client";
import { Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";

export type TreeItem = {
  key: string;
  label: React.ReactNode;
  children?: TreeItem[];
};
export type FilerTabsTreeData = TreeItem[];

export interface FilerTabsTreeProps {
  filerTabsTreeData: FilerTabsTreeData;
  defaultActiveKey?: string;
  onChange?: ((activeKey: string) => void) | undefined;
}
const FilerTabsTree = ({ filerTabsTreeData, onChange, defaultActiveKey }: FilerTabsTreeProps) => {
  const [currentSelectedLevel, setCurrentSelectedLevel] = useState<number>(0);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([""]);
  const [isCurrentSelectedEnd, setIsCurrentSelectedEnd] = useState<boolean>(false);

  const handleOnChangeByLevel = (activeKey: string, level: number) => {
    setCurrentSelectedLevel(level + 1);
    const newSelectedKeys = [...selectedKeys].slice(0, level);
    newSelectedKeys[level] = activeKey;
    setSelectedKeys(newSelectedKeys);
    getInfoByKey(activeKey).isLastNode && setIsCurrentSelectedEnd(true);
  };

  useEffect(() => {
    if (isCurrentSelectedEnd) {
      onChange?.(selectedKeys[selectedKeys.length - 1]);
      setIsCurrentSelectedEnd(false);
    }
  }, [isCurrentSelectedEnd, selectedKeys, onChange]);

  const getTabsByLevel = (level: string) => {
    let nextTabs: TreeItem[] = filerTabsTreeData;
    selectedKeys.map((key, index) => {
      if (index > parseInt(level)) return;
      if (index < parseInt(level)) {
        nextTabs =
          nextTabs?.find((i) => {
            return i.key === key;
          })?.children ?? [];
      }
    });

    return nextTabs?.length
      ? nextTabs.map((i) => ({ label: i.label, key: i.key }))
      : parseInt(level) === 0
        ? filerTabsTreeData?.map((i) => ({ label: i.label, key: i.key }))
        : [];
  };

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

    traverse(filerTabsTreeData, []);
    return { isLastNode, currentSelectedKeysPath };
  };

  const initTree = (filerTabsTreeData: FilerTabsTreeData) => {
    const initByDefaultActiveKey = (defaultActiveKey: string) => {
      const { isLastNode, currentSelectedKeysPath } = getInfoByKey(defaultActiveKey);
      if (isLastNode) {
        setCurrentSelectedLevel(currentSelectedKeysPath.length - 1);
        setSelectedKeys(currentSelectedKeysPath);
      }
    };

    const initWithoutDefaultActiveKey = (tmpSelectedKeys: string[]) => {
      const initTab = nextTabs[0];
      if (initTab) {
        setCurrentSelectedLevel(maxDeep);
        tmpSelectedKeys.push(initTab?.key);
        setSelectedKeys(tmpSelectedKeys);
      }
    };

    let maxDeep = 0;
    let nextTabs: TreeItem[] = [...(filerTabsTreeData ?? [])];
    const tmpSelectedKeys: string[] = [];
    while (nextTabs.length > 0) {
      if (defaultActiveKey) {
        initByDefaultActiveKey(defaultActiveKey);
      } else {
        initWithoutDefaultActiveKey(tmpSelectedKeys);
      }
      maxDeep++;
      nextTabs = nextTabs[0].children ?? [];
    }
    return maxDeep;
  };

  const maxDeep = useMemo(() => {
    return initTree(filerTabsTreeData);
  }, [filerTabsTreeData]);

  return (
    <>
      {Array(maxDeep + 1)
        .fill(0)
        .map((_, index) => {
          const items = getTabsByLevel(index.toString());
          return (
            index <= currentSelectedLevel &&
            items?.length !== 0 && (
              <Tabs
                activeKey={selectedKeys[index] ?? "3"}
                defaultActiveKey={""}
                key={index}
                items={items}
                onChange={(activeKey) => handleOnChangeByLevel(activeKey, index)}
              />
            )
          );
        })}
    </>
  );
};

export default FilerTabsTree;
