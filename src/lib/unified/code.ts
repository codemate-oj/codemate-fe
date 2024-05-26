import { visit } from "unist-util-visit";
import type { Parent, Node } from "unist";
import type { Plugin } from "unified";
import { Code, Heading } from "mdast";

const regex = /(input|output)(\d+)/g;
const TRANSLATION_MAP: Record<string, string> = {
  input: "输入数据",
  output: "输出数据",
};

const code: Plugin = () => {
  const buildFlexContainer = (...contents: Node[]) => ({
    type: "element",
    tagName: "div",
    children: contents,
  });

  return (node: Node) => {
    if (!("children" in node)) return;
    const tree = node as Parent;
    visit(tree, (node, nodeIndex, parent) => {
      if (typeof nodeIndex === "undefined" || !parent) return;
      if (node.type === "code") {
        const code = node as Code;
        if (!code.lang) return;
        const matches = code.lang.matchAll(regex);
        for (const match of matches) {
          const [, type, dataIndex] = match;
          const dataTitle: Heading = {
            type: "heading",
            depth: 3,
            children: [{ type: "text", value: `${TRANSLATION_MAP[type]} ${dataIndex}` }],
          };
          parent.children.splice(nodeIndex, 1, buildFlexContainer(dataTitle, node));
        }
      }
    });
  };
};

export default code;
