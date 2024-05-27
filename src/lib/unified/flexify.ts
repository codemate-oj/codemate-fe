import type { Heading } from "mdast";
import type { Plugin } from "unified";
import type { Parent, Node } from "unist";
import { visit } from "unist-util-visit";
import { getNodeText } from "../problem-parse";

// 定义一个插件，用于将 <h2>及其后缀的<p>元素包裹在带有flex和items-center类的<div>中
const flexify: Plugin = () => {
  const buildFlexContainer = (...contents: Node[]) => ({
    type: "element",
    tagName: "div",
    children: contents,
  });

  return (node: Node) => {
    if (!("children" in node)) return;
    const tree = node as Parent;
    visit(tree, (node, index, parent) => {
      if (typeof index === "undefined") return;
      if (node.type === "heading") {
        const h = node as Heading;
        if (h.depth !== 2 || !parent) return;
        const nextNode = parent.children[index + 1];
        // 当下一个节点是<p>且内容不被【】包裹时，将其包裹在带有flex和items-center类的<div>中
        if (
          nextNode &&
          nextNode.type === "paragraph" &&
          // 特殊逃逸规则：规避手写的【】内容
          !getNodeText(nextNode)
            .trim()
            .match(/【([^】]*)】/g)
        ) {
          const flexDiv = buildFlexContainer(node, nextNode);
          parent.children.splice(index, 2, flexDiv);
        } else {
          const flexDiv = buildFlexContainer(node);
          parent.children.splice(index, 1, flexDiv);
        }
      }
    });
  };
};

export default flexify;
