import type { FormilySchema, OptionType, Property } from "@/components/problem/formilySchema";
import type { Parent, Node, List } from "mdast";

const regex = /{{\s*(\w+)\s*\(\s*(\d+)\s*\)\s*}}/g;

const getNodeText = (node: Node) => {
  let nodeText = "";
  if ("value" in node) nodeText = node.value as string;
  if ("children" in node) nodeText = (node.children as Node[]).map(getNodeText).join();
  return nodeText;
};

const extractTitle = (nodeIndex: number, ast: Parent) => {
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
      if (item.children && item.children.length > 0) {
        const text = getNodeText(item);
        console.log(text);
        return { label: text, value: String.fromCharCode("A".charCodeAt(0) + index) };
      }
      return null;
    })
    .filter(Boolean) as OptionType[]; // 过滤null值

export const extractQuestionsFromAst = (ast: Parent) => {
  console.log(ast);
  const schema: FormilySchema = {
    type: "object",
    properties: {},
  };

  ast.children.forEach((node, nodeIndex) => {
    if (node.type === "paragraph") {
      const text = getNodeText(node);
      const infos = text.matchAll(regex);
      for (const info of infos) {
        if (!info) return;
        const [_, type, pIndex] = info;
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
            schema.properties[`question${pIndex}`] = obj;
            break;
          }
          case "select":
          case "multiselect": {
            let i = nodeIndex + 1,
              listNode = ast.children[i];
            while (i < ast.children.length && listNode.type !== "list") {
              listNode = ast.children[i++];
            }
            const options = listNode.type === "list" ? extractOptions(listNode) : [];
            const obj: Property = {
              type: "string",
              title: titleText,
              "x-decorator": "FormItem",
              "x-component": type === "select" ? "CustomSelect" : "CustomMutiSelect",
              enum: options,
            };
            schema.properties[`question${pIndex}`] = obj;
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
