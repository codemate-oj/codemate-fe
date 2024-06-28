import { Spin } from "antd";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useCallback, useEffect } from "react";
import { languages } from "monaco-editor";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as cppLanguage } from "monaco-editor/esm/vs/basic-languages/cpp/cpp.js";
// @ts-expect-errorNEXTLINE 无类型声明
import { language as pythonLanguage } from "monaco-editor/esm/vs/basic-languages/python/python.js";

interface CodeEditorProps {
  selectedLanguage: string;
  code: string;
  handleCode: (code: string | undefined) => void;
}

const isRegistered = {
  cpp: false,
  python: false,
};

const CodeEditor: React.FC<CodeEditorProps> = ({ selectedLanguage, code, handleCode }) => {
  const editorInstance = useMonaco();

  const registerLanguage = useCallback(
    (language: string, rule: languages.IMonarchLanguage) => {
      if (editorInstance) {
        editorInstance.languages.registerCompletionItemProvider(language, {
          provideCompletionItems: function (model, position) {
            const suggestions: languages.CompletionItem[] = [];
            // 获取当前单词的范围
            const word = model.getWordAtPosition(position);
            if (word) {
              const startLineNumber = position.lineNumber;
              const startColumn = word.startColumn;
              const endLineNumber = position.lineNumber;
              const endColumn = word.endColumn;

              // 确保单词范围有效
              const currentWordRange = new editorInstance.Range(startLineNumber, startColumn, endLineNumber, endColumn);

              rule.keywords.forEach((item: string) => {
                suggestions.push({
                  label: item,
                  kind: editorInstance.languages.CompletionItemKind.Keyword,
                  insertText: item,
                  range: currentWordRange,
                });
              });
              rule.operators?.forEach((item: string) => {
                suggestions.push({
                  label: item,
                  kind: editorInstance.languages.CompletionItemKind.Operator,
                  insertText: item,
                  range: currentWordRange,
                });
              });
            }
            return {
              suggestions: suggestions,
              incomplete: true,
            };
          },
        });
        editorInstance.languages.register({ id: language });
        editorInstance.languages.setMonarchTokensProvider(language, rule);
        isRegistered[language as "cpp" | "python"] = true;
      }
    },
    [editorInstance]
  );

  useEffect(() => {
    if (!isRegistered["cpp"]) {
      registerLanguage("cpp", cppLanguage);
    }
    if (!isRegistered["python"]) {
      registerLanguage("python", pythonLanguage);
    }
  }, [editorInstance, registerLanguage]);

  return (
    <Editor
      language={selectedLanguage}
      value={code}
      loading={<Spin />}
      onChange={handleCode}
      options={{ fixedOverflowWidgets: true }}
    />
  );
};

export default CodeEditor;
