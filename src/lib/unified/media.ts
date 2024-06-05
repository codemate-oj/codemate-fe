import { visit } from "unist-util-visit";
import type { Parent, Node } from "unist";
import type { Plugin } from "unified";
import { Html, Image, Paragraph } from "mdast";
import { remoteUrl } from "../utils";

/**
 * 创建一个处理节点树的媒体插件。
 *
 * @param {string} prefix - 要添加到图片 URL 的前缀，默认为CDN_PREFIX
 * @param {Array<{ name: string }>} [files] - 可选的文件名数组。
 * @return {Plugin} 一个处理节点树的插件函数。
 */
const media: (prefix?: string, files?: { name: string }[]) => Plugin = (prefix = "", files) => {
  return () => {
    return (node: Node) => {
      if (!("children" in node)) return;
      const tree = node as Parent;
      visit(tree, (node, nodeIndex, parent) => {
        if (typeof nodeIndex === "undefined" || !parent) return;
        if (node.type === "image") {
          // 处理图片的file://协议
          const img = node as Image;
          const info = img.url.match(/file:\/\/([^ \n)\\"]+)/);
          if (!info) {
            // 处理相对路径的情况
            if (img.url.startsWith("/")) {
              img.url = remoteUrl(`${prefix}${img.url.slice(1)}`);
            }
          } else {
            const fileinfo = info[1];
            let filename = fileinfo.split("?")[0]; // remove querystring
            try {
              filename = decodeURIComponent(filename);
            } catch (e) {}
            if (files && !files.find((i) => i.name === filename)) return;
            img.url = remoteUrl(`${prefix}/${fileinfo}`);
          }
        }
        if (node.type === "paragraph") {
          // 处理视频
          const p = node as Paragraph;
          const [text, link] = p.children;
          if (text.type !== "text" || text.value !== "@" || link.type !== "link") return;
          const video: Html = {
            type: "html",
            value: `<video src="${remoteUrl(link.url)}" controls />`,
          };
          parent.children.splice(nodeIndex, 1, video);
        }
      });
    };
  };
};

export default media;
