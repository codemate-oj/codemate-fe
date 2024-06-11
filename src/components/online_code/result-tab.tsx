import { Allotment, AllotmentHandle } from "allotment";
import { Collapse, Tabs, Input } from "antd";
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useWebSocket } from "ahooks";

const tabList = [
  { key: "tab1", label: "自测结果" },
  { key: "tab2", label: "评测结果" },
];

interface ResultTabProps {
  children: React.ReactNode;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  output: string;
  wsRid: string;
}

const ResultTab: React.FC<ResultTabProps> = ({ children, handleInput, output, wsRid }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState<string>("");
  const [position, setPosition] = useState<string>("40%");
  const paneRef = useRef<AllotmentHandle>(null);
  const [result, setResult] = useState<{ status: number; status_html: string; summary_html: string }>({
    status: 0,
    status_html: "",
    summary_html: "",
  });

  const contentList: Record<string, React.ReactNode> = useMemo(
    () => ({
      tab1: (
        <div className="flex items-center justify-around">
          <div className="w-2/5">
            输入：
            <div className="h-28 border rounded-lg">
              <Input.TextArea
                className="!h-28 overflow-auto"
                allowClear
                onChange={handleInput}
                autoSize={{ minRows: 4 }}
              />
            </div>
          </div>
          <div className="w-2/5">
            输出：
            <div className="h-28 border rounded-lg">
              <Input.TextArea
                className="!h-28 overflow-auto !bg-white !text-inherit !cursor-default"
                disabled
                value={output}
                autoSize={{ minRows: 4 }}
              />
            </div>
          </div>
        </div>
      ),
      tab2: (
        <div className="flex items-center justify-center">
          <div className="w-4/5">
            <div className="h-28 overflow-auto text-inherit border rounded-lg">
              {/*<div dangerouslySetInnerHTML={{ __html: result.status_html }} />*/}
              <div dangerouslySetInnerHTML={{ __html: result.summary_html }} />
            </div>
          </div>
        </div>
      ),
    }),
    [handleInput, output, result.summary_html]
  );

  const { connect: wsConnect } = useWebSocket(`ws://43.139.233.159/record-detail-conn?domainId=system&rid=${wsRid}`, {
    manual: true,
    onMessage: (message: WebSocketEventMap["message"]) => {
      setResult(JSON.parse(message.data));
    },
  });

  useEffect(() => {
    if (wsRid) {
      wsConnect();
    }
  }, [wsConnect, wsRid]);

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
