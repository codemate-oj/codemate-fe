import type { OptionType, Property, FormilySchema } from "@/components/problem/formily-renderer";
import type { Parent, Node, List, ListItem } from "mdast";
import * as unified from "unified";
import * as markdown from "remark-parse";

const astProcessor = unified.unified().use(markdown.default);

const regex = /{{\s*(\w+)\s*\(\s*(\d+)\s*\)\s*}}/g;

export const getNodeText = (node: Node): string => {
  let nodeText = "";
  if ("value" in node) nodeText = node.value as string;
  if ("children" in node) nodeText = (node.children as Node[]).map(getNodeText).join();
  return nodeText;
};

const extractTitle = (nodeIndex: number, ast: Parent): string => {
  const node = ast.children[nodeIndex];
  const nodeText = getNodeText(node);
  let title = nodeText.replace(regex, "").trim();
  let i = nodeIndex - 1;
  while (!title && i >= 0) {
    // 如果当前Node没有标题，则向前寻找第一个非空标题节点
    const preNode = ast.children[i--];
    title = getNodeText(preNode).replace(regex, "").trim();
  }
  return title;
};

const extractOptions = (node: List): OptionType[] =>
  node.children
    .map((item, index) => {
      const listItem = item as ListItem;
      if (listItem.children && listItem.children.length > 0) {
        const text = getNodeText(listItem);
        return { label: text, value: String.fromCharCode("A".charCodeAt(0) + index) };
      }
      return null;
    })
    .filter(Boolean) as OptionType[]; // 过滤null值

export const extractQuestionsFromAst = (ast: Parent): FormilySchema => {
  const schema: FormilySchema = {
    type: "object",
    properties: {},
  };

  ast.children.forEach((node: { type: string }, nodeIndex: number) => {
    if (node.type === "paragraph") {
      const text = getNodeText(node);
      const infos = text.matchAll(regex);
      for (const info of infos) {
        if (!info) return;
        const [, type, pIndex] = info;
        const titleText = extractTitle(nodeIndex, ast);

        switch (type) {
          case "input":
          case "textarea": {
            const obj: Property = {
              type: "string",
              title: titleText,
              "x-decorator": "FormItem",
              "x-component": "CustomInput",
            };
            schema.properties[`${pIndex}`] = obj;
            break;
          }
          case "select":
          case "multiselect": {
            // 寻找后方第一个列表节点
            let i = nodeIndex + 1,
              listNode = ast.children[i];
            while (i < ast.children.length && listNode.type !== "list") {
              listNode = ast.children[i++];
            }
            if (listNode.type !== "list") break;
            const options = extractOptions(listNode as List);
            const obj: Property = {
              type: "select",
              title: titleText,
              "x-decorator": "FormItem",
              "x-component": type === "select" ? "CustomSelect" : "CustomMutiSelect",
              enum: options,
            };
            schema.properties[`${pIndex}`] = obj;
            break;
          }
          default:
            break;
        }
      }
    }
  });

  return schema;
};

export const extractQuestionsFromMarkdown = (raw: string): FormilySchema => {
  const ast = astProcessor.parse(raw) as Parent;
  return extractQuestionsFromAst(ast);
};
