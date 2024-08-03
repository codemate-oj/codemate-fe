export function stripMarkdown(text: string) {
  if (!text) {
    return "";
  }
  // 移除标题
  text = text.replace(/^#+\s+/gm, "");
  // 移除加粗和斜体
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");
  // 移除删除线
  text = text.replace(/~~(.*?)~~/g, "$1");
  // 移除链接，只保留链接文本
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // 移除图片
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");
  // 移除行内代码标记
  text = text.replace(/`([^`]+)`/g, "$1");
  // 移除代码块标记
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`{3}[\s\S]*?`{3}/g, "");
  // 移除引用标记
  text = text.replace(/^>\s+/gm, "");
  // 移除无序列表标记
  text = text.replace(/^\s*[-+*]\s+/gm, "");
  // 移除有序列表标记
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  // 移除表格标记
  text = text.replace(/(\|.*?)+\|/g, "");
  text = text.replace(/^-{3,}\s*$/gm, ""); // 移除表格分隔线
  // 移除换行符
  text = text.replace(/\\n/g, " ");
  // 移除其他转义符
  text = text.replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, "$1");
  // 移除 LaTeX 行内公式标记
  text = text.replace(/\$(.*?)\$/g, "$1");
  // 移除模板语法
  text = text.replace(/{{.*?}}/g, "");

  return text;
}
