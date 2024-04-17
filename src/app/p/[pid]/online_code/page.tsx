"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { Button, Select } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { MonacoEditorReactComp } from "@typefox/monaco-editor-react";
import * as vscode from "vscode";
import getKeybindingsServiceOverride from "@codingame/monaco-vscode-keybindings-service-override";
import { UserConfig } from "monaco-editor-wrapper";
import { MonacoLanguageClient } from "monaco-languageclient";

// this is required syntax highlighting
import "@codingame/monaco-vscode-python-default-extension";
import { MonacoEditorLanguageClientWrapper } from "monaco-editor-wrapper";

export const createPythonConfig = (code: string): UserConfig => {
  return {
    languageClientConfig: {
      options: {
        name: "Python Language Server Example",
        $type: "WebSocket",
        host: "localhost",
        port: 30001,
        path: "pyright",
        extraParams: {
          authorization: "UserAuth",
        },
        secured: false,
        startOptions: {
          onCall: (languageClient?: MonacoLanguageClient) => {
            setTimeout(() => {
              ["pyright.restartserver", "pyright.organizeimports"].forEach((cmdName) => {
                vscode.commands.registerCommand(cmdName, (...args: unknown[]) => {
                  languageClient?.sendRequest("workspace/executeCommand", { command: cmdName, arguments: args });
                });
              });
            }, 250);
          },
          reportStatus: true,
        },
      },
      clientOptions: {
        documentSelector: ["python"],
        workspaceFolder: {
          index: 0,
          name: "workspace",
          uri: vscode.Uri.parse("/workspace/"),
        },
      },
    },
    wrapperConfig: {
      serviceConfig: {
        userServices: {
          ...getKeybindingsServiceOverride(),
        },
        debugLogging: true,
      },
      editorAppConfig: {
        $type: "extended",
        languageId: "python",
        codeUri: "/workspace/python.py",
        extensions: [
          {
            config: {
              name: "python-client",
              publisher: "monaco-languageclient-project",
              version: "1.0.0",
              engines: {
                vscode: "^1.85.0",
              },
              contributes: {
                languages: [
                  {
                    id: "python",
                    extensions: [".py", "pyi"],
                    aliases: ["python"],
                    mimetypes: ["application/python"],
                  },
                ],
              },
            },
          },
        ],
        userConfiguration: {},
        useDiffEditor: false,
        code,
      },
    },
    loggerConfig: {
      enabled: true,
      debugEnabled: true,
    },
  };
};
export const createCppConfig = (code: string): UserConfig => {
  return {
    languageClientConfig: {
      options: {
        name: "Python Language Server Example",
        $type: "WebSocket",
        host: "localhost",
        port: 30002,
        path: "cpp",
        secured: false,
        startOptions: {
          onCall: (languageClient?: MonacoLanguageClient) => {},
          reportStatus: true,
        },
      },
      clientOptions: {
        documentSelector: ["cpp"],
        workspaceFolder: {
          index: 0,
          name: "workspace",
          uri: vscode.Uri.parse("/workspace/"),
        },
      },
    },
    wrapperConfig: {
      serviceConfig: {
        userServices: {
          ...getKeybindingsServiceOverride(),
        },
        debugLogging: true,
      },
      editorAppConfig: {
        $type: "extended",
        languageId: "cpp",
        extensions: [
          {
            config: {
              name: "cpp-client",
              publisher: "monaco-languageclient-project",
              version: "1.0.0",
              engines: {
                vscode: "^1.85.0",
              },
              contributes: {
                languages: [
                  {
                    id: "cpp",
                    aliases: ["cpp"],
                    mimetypes: ["application/cpp"],
                  },
                ],
              },
            },
          },
        ],
        userConfiguration: {},
        useDiffEditor: false,
        code,
      },
    },
    loggerConfig: {
      enabled: true,
      debugEnabled: true,
    },
  };
};

const clientLang = ["Python", "Cpp"];

const Page = () => {
  const editorInstance = useMonaco();
  const [selectedLanguage, setSelectedLanguage] = useState("typescript");
  const [code, setCode] = useState("");

  const onlineEditorHeader: {
    label?: string;
    type?: "default" | "select";
    options?: string[];
    onSelectedChange?: (value: string) => void;
  }[] = [
    {
      label: "运行自测(F9)",
    },
    {
      label: "递交评测(F10)",
    },
    {
      label: "退出(Alt+Q)",
    },
    {
      type: "select",
      options: ["TypeScript", ...clientLang],
      onSelectedChange: (value) => {
        if (!editorInstance) return;
        const lang = value?.toLocaleLowerCase();
        console.log(`Selected language: ${lang}`);
        setSelectedLanguage(lang);
        setCode("");
      },
    },
    {
      label: "自测",
    },
    {
      label: "评测记录",
    },
  ];

  const renderLspEditor = () => (
    <>
      <MonacoEditorReactComp
        style={{
          width: "100%",
          height: "90vh",
          display: selectedLanguage === "cpp" ? "block" : "none",
        }}
        value={code}
        onTextChanged={onTextChanged}
        onLoad={(wrapper: MonacoEditorLanguageClientWrapper) => {
          console.log(`Loaded ${wrapper.reportStatus().join("\n").toString()}`);
        }}
        onError={(e) => {
          console.error(e);
        }}
        userConfig={createCppConfig(code)}
      />
      <MonacoEditorReactComp
        style={{
          width: "100%",
          height: "90vh",
          display: selectedLanguage === "python" ? "block" : "none",
        }}
        value={code}
        onTextChanged={onTextChanged}
        onLoad={(wrapper: MonacoEditorLanguageClientWrapper) => {
          console.log(`Loaded ${wrapper.reportStatus().join("\n").toString()}`);
        }}
        onError={(e) => {
          console.error(e);
        }}
        userConfig={createPythonConfig(code)}
      />
    </>
  );
  const onTextChanged = (text: string, isDirty: boolean) => {
    console.log(`Dirty? ${isDirty} Content: ${text}`);
  };
  return (
    <>
      <div className="w-full flex">
        <div className="w-[50%] h-32"></div>
        <div className="flex-1 h-32">
          {onlineEditorHeader.map((item, index) => {
            const className = "mr-2 mb-2";
            switch (item.type) {
              case "select":
                return (
                  <div className={clsx(className, "inline-block")} key={index}>
                    <Select
                      style={{ width: 120 }}
                      defaultValue={item?.options?.[0]}
                      onChange={item.onSelectedChange}
                      options={item?.options?.map((i) => ({
                        label: i,
                        value: i,
                      }))}
                    />
                  </div>
                );
              default:
                return (
                  <Button key={index} className={className}>
                    {item.label}
                  </Button>
                );
            }
          })}
          {renderLspEditor()}
          <div
            style={{
              display: selectedLanguage === "typescript" ? "block" : "none",
            }}
          >
            <Editor
              height="90vh"
              defaultLanguage={"typescript"}
              value={code}
              onMount={(editor) => {
                editor.focus();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
