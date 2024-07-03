import { Allotment, AllotmentHandle } from "allotment";
import { Collapse, Tabs } from "antd";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import RecordList from "../record/record-list";
import { debounce } from "lodash";

const tabList = [
  // { key: "selftest", label: "自测结果" },
  { key: "submission", label: "评测结果" },
];

interface ResultTabProps {
  children: React.ReactNode;
  pid: string;
  input: string;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rid: string;
  selfRid: string;
}

const ResultTab: React.FC<ResultTabProps> = ({ children, pid }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>("submission");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState<string>("");
  const [position, setPosition] = useState<string>("60%");
  const paneRef = useRef<AllotmentHandle>(null);
  // const [result, setResult] = useState<{ status: number; status_html: string; summary_html: string }>({
  //   status: 0,
  //   status_html: "",
  //   summary_html: "",
  // });
  // const [selfResult, setSelfResult] = useState<{ status: number; status_html: string; summary_html: string }>({
  //   status: 0,
  //   status_html: "",
  //   summary_html: "",
  // });
  const [tableHeight, setTableHeight] = useState<number>(130); // 初始高度

  const contentList: Record<string, React.ReactNode> = useMemo(
    () => ({
      // selftest: (
      //   <div className="flex items-center justify-around">
      //     <div className="w-2/5">
      //       输入：
      //       <div className="h-28 rounded-lg">
      //         <Input.TextArea
      //           className="!h-28 overflow-auto"
      //           allowClear
      //           value={input}
      //           onChange={handleInput}
      //           autoSize={{ minRows: 4 }}
      //         />
      //       </div>
      //     </div>
      //     <div className="w-2/5">
      //       输出：
      //       <div className="h-28 overflow-auto rounded-lg border border-[#d9d9d9] px-3 pt-1 text-inherit">
      //         <div dangerouslySetInnerHTML={{ __html: selfResult.status_html }} />
      //         <div dangerouslySetInnerHTML={{ __html: selfResult.summary_html }} />
      //       </div>
      //     </div>
      //   </div>
      // ),
      submission: (
        <div className="flex h-[20vh] w-full justify-center">
          <RecordList
            builtinFilter={{ pid }}
            hiddenColumns={["submitBy", "problem"]}
            tableProps={{ virtual: true, scroll: { y: tableHeight } }}
          />
        </div>
      ),
    }),
    [pid, tableHeight]
  );

  // const { connect: wsSelfConnect } = useWebSocket(
  //   `ws://43.139.233.159/record-detail-conn?domainId=system&rid=${selfRid}`,
  //   {
  //     manual: true,
  //     onMessage: (message: WebSocketEventMap["message"]) => {
  //       setSelfResult(JSON.parse(message.data));
  //     },
  //   }
  // );
  // useEffect(() => {
  //   if (selfRid) {
  //     wsSelfConnect();
  //   }
  // }, [wsSelfConnect, selfRid]);

  // const { connect: wsConnect } = useWebSocket(`ws://43.139.233.159/record-detail-conn?domainId=system&rid=${rid}`, {
  //   manual: true,
  //   onMessage: (message: WebSocketEventMap["message"]) => {
  //     setResult(JSON.parse(message.data));
  //   },
  // });
  // useEffect(() => {
  //   if (rid) {
  //     wsConnect();
  //   }
  // }, [wsConnect, rid]);

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
    <Allotment
      vertical
      defaultSizes={[9, 1]}
      ref={paneRef}
      onDragEnd={handlePositionChange}
      onChange={([, tabSize]) => {
        debounce(() => {
          setTableHeight(Math.max(100, tabSize * 0.5));
        }, 100)();
      }}
    >
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
          ghost
        />
      </Allotment.Pane>
    </Allotment>
  );
};

export default ResultTab;
