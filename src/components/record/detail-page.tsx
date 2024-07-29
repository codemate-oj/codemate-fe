"use client";
import type { components } from "@/types/schema";
import { Card } from "antd";
import React from "react";
import JudgeStatus from "./judge-status";
import { parseTemplate } from "@/lib/utils";
import TestCases from "./test-cases";
import useRealtimeRecordDetail from "@/hooks/useRecordDetailConn";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type RecordDoc = components["schemas"]["Record"];

interface IProps {
  rid: string;
  defaultValue: RecordDoc;
}

const DetailPage: React.FC<IProps> = ({ defaultValue, rid }) => {
  const rdoc = useRealtimeRecordDetail(rid, defaultValue);
  // TODO 模拟获取CODE
  const showCode: boolean = true;
  const codeType: string = "javascript";
  const codeText: string = `
    import React from 'react';
    import Highlight, { Prism } from 'react-syntax-highlighter';
    const codeString = 'function helloWorld() {
        console.log('Hello, world!');
    };'

    // 测试高亮注释
    function App() {
        return (
            <Highlight language="javascript" style={Prism}>
                {codeString}
            </Highlight>
        );
    }

    export default App;`;

  if (!rdoc) {
    return null;
  }
  return (
    <div className="mt-5">
      <Card title={<JudgeStatus statusCode={rdoc.status} score={rdoc.score} />}>
        <h3 className="text-lg font-bold">评测详情</h3>
        <div className="my-5 text-fail">
          {rdoc.compilerTexts.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          {rdoc.judgeTexts.map((item, index) => (
            <div key={index}>{typeof item === "string" ? item : parseTemplate(item.message, item.params ?? [])}</div>
          ))}
        </div>
        {rdoc.testCases.length > 0 && <TestCases rid={rdoc._id} testCases={rdoc.testCases} />}
      </Card>

      {/* TODO 这里需要后端一些判断规则，如只有编程题显示等等，整个上面可以添加一下骨架 */}
      {showCode && (
        <div>
          <h3 className="text-lg font-bold">我的代码</h3>
          <SyntaxHighlighter
            showLineNumbers={true}
            startingLineNumber={0}
            language={codeType}
            style={dark}
            lineNumberStyle={{ color: "#ddd", fontSize: 20 }}
            wrapLines={true}
          >
            {codeText.replace(/^\s+|\s+$/g, "")}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
