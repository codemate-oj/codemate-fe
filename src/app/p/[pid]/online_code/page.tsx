"use client";

import { useMonaco } from "@monaco-editor/react";
import { Button, Select } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import * as vscode from "vscode";
import getKeybindingsServiceOverride from "@codingame/monaco-vscode-keybindings-service-override";
import { UserConfig } from "monaco-editor-wrapper";
import { MonacoLanguageClient } from "monaco-languageclient";
import { MonacoEditorLanguageClientWrapper } from "monaco-editor-wrapper";
import * as monaco from "monaco-editor";
const wrapperCpp = new MonacoEditorLanguageClientWrapper();
const wrapperPython = new MonacoEditorLanguageClientWrapper();

const monacoEditorConfig = {
  glyphMargin: true,
  guides: {
    bracketPairs: true,
  },
  lightbulb: {
    enabled: monaco.editor.ShowLightbulbIconMode.On,
  },
};
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
                //@ts-ignore
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
          //@ts-ignore
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
        editorOptions: monacoEditorConfig,
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
          //@ts-ignore
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
        editorOptions: monacoEditorConfig,
      },
    },
    loggerConfig: {
      enabled: true,
      debugEnabled: true,
    },
  };
};

const ConfigMap = {
  python: createPythonConfig,
  cpp: createCppConfig,
};

const clientLang = ["Python", "Cpp"];

const Page = () => {
  const editorInstance = useMonaco();
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const t = async () => {};
  useEffect(() => {
    t();
  }, []);

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
      options: [...clientLang],
      onSelectedChange: async (value) => {
        if (!editorInstance) return;
        const lang = value?.toLocaleLowerCase();
        console.log(`Selected language: ${lang}`);
        setSelectedLanguage(lang);
        if (lang === "python") {
          wrapperCpp.dispose();
          await wrapperPython.initAndStart(createPythonConfig(code), document.getElementById("editor"));
        } else if (lang === "cpp") {
          wrapperPython.dispose();
          await wrapperCpp.initAndStart(createCppConfig(code), document.getElementById("editor"));
        }

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
    <div
      style={{
        width: "100%",
        height: "90vh",
      }}
    >
      <div
        id="editor"
        style={{
          width: "100%",
          height: "90vh",
        }}
      ></div>
    </div>
  );
  const onTextChanged = (text: string, isDirty: boolean) => {
    console.log(`Dirty? ${isDirty} Content: ${text}`);
  };
  return (
    <>
      <div className="w-full flex">
        <div className="w-[50%] h-32"></div>
        <div className="flex-1">
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
        </div>
      </div>
    </>
  );
};
export default Page;
