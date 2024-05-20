"use client";
import React from "react";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <Editor
      height="30vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      // theme="vs-dark"
      value={value}
      onChange={handleEditorChange}
      options={{
        tabSize: 2,
        insertSpaces: true,
      }}
    />
  );
};

export default CodeEditor;
