import { request } from "./request";

export type ProblemType = "objective" | "scratch" | "default";

interface PdocWithConfig {
  config:
    | {
        type: string;
        langs?: string[];
      }
    | string;
}

/**
 * Determines the type of a question based on the provided problem document (pdoc).
 *
 * @param {PdocWithConfig} pdoc - The problem document containing configuration information.
 * @return {ProblemType} The type of the question, which can be "objective", "scratch", or "default".
 */
export function getProblemType(pdoc?: PdocWithConfig): ProblemType {
  // 当config不存在时，返回默认类型
  if (typeof pdoc?.config !== "object") return "default";
  // 当config存在时，返回config中的类型
  if (pdoc.config.type === "objective") return "objective";
  if (pdoc.config.langs?.length === 1 && pdoc.config.langs?.includes("scratch")) return "scratch";
  return "default";
}

/**
 * Retrieves the list of available question languages based on the provided problem document (pdoc).
 *
 * @param {PdocWithConfig} pdoc - The problem document containing configuration information.
 * @return {string[]} An array of strings representing the available question languages.
 */
export function getProgrammingLangs(pdoc?: PdocWithConfig): string[] {
  const langMap: Record<string, string> = {
    "cc.cc14o2": "C++",
    "py.py3": "Python",
  };
  // 默认返回所有可用语言
  const allLangs = Object.keys(langMap);
  if (typeof pdoc?.config !== "object" || !Array.isArray(pdoc?.config?.langs) || pdoc.config.langs.length === 0) {
    return allLangs;
  }
  const langs = pdoc.config.langs.filter((lang) => {
    return allLangs.includes(lang);
  });
  // 若有配置则返回配置中的语言
  return langs.length > 0 ? langs : allLangs;
}

/**
 * Retrieves the content of a markdown document.
 *
 * @param {Object} serverPdoc - The object containing the content of the markdown document.
 * @param {string} serverPdoc.content - The content of the markdown document.
 * @return {string} The content of the markdown document.
 */
export function getMarkdownContent(pdoc?: { content: string }) {
  if (!pdoc) return "";
  if (typeof pdoc?.content !== "string") return "";
  let _content = pdoc.content;
  try {
    // 部分题目可能没有使用多语言模式
    const { zh, en } = JSON.parse(pdoc.content) as { zh: string; en: string };
    _content = zh || en;
  } catch (error) {
    console.error(error);
  }
  return _content;
}
