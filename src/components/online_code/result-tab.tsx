import { Allotment, AllotmentHandle } from "allotment";
import { Collapse, Tabs } from "antd";
import { useRef, useState } from "react";

const tabList = [
  { key: "tab1", label: "自测结果" },
  { key: "tab2", label: "评测结果" },
];
const contentList: Record<string, React.ReactNode> = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

interface ResultTabProps {
  children: React.ReactNode;
}

const ResultTab: React.FC<ResultTabProps> = ({ children }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState<string>("");
  const [position, setPosition] = useState<string>("50%");
  const paneRef = useRef<AllotmentHandle>(null);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const handleCollapse = (keys: string | string[]) => {
    if (keys.length) {
      setCollapseKey("result");
    } else {
      setCollapseKey("");
    }
    if (isCollapsed) {
      if (paneRef.current) paneRef.current.resize([9, 1]);
    } else {
      if (paneRef.current) paneRef.current.reset();
    }
    setIsCollapsed(Boolean(keys.length));
  };
  const handlePositionChange = (position: number[]) => {
    const nowPosition = position[1] / (position[0] + position[1]);
    if (nowPosition > 0.1) {
      setCollapseKey("result");
      setIsCollapsed(true);
      setPosition(`${nowPosition * 100}%`);
    } else {
      setCollapseKey("");
      setIsCollapsed(false);
    }
  };
  const collapseItem = [
    {
      key: "result",
      label: <Tabs activeKey={activeTabKey} items={tabList} onChange={onTabChange} />,
      children: contentList[activeTabKey],
    },
  ];
  return (
    <Allotment vertical defaultSizes={[9, 1]} ref={paneRef} onDragEnd={handlePositionChange}>
      <Allotment.Pane minSize={200} className="duration-300 ease-in-out">
        {children}
      </Allotment.Pane>
      <Allotment.Pane preferredSize={position} className="duration-300 ease-in-out" snap>
        <Collapse
          activeKey={collapseKey}
          items={collapseItem}
          collapsible="icon"
          expandIconPosition="end"
          onChange={handleCollapse}
          className="!my-2 !mr-3"
          ghost
        />
      </Allotment.Pane>
    </Allotment>
  );
};

export default ResultTab;
