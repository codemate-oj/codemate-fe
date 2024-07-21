export enum PromblemTag {
  "按题型" = "problem_type",
  "按难度" = "problem_difficulty",
  "按偏好" = "problem_preference",
  "按时间" = "problem_time",
  "按知识点" = "problem_knowledge",
  "全部标签" = "problem_all_tag",
}
export enum LangTag {
  "语言入门（请选择入门与面试题库）" = "lang_beginner",
  "顺序结构" = "lang_sequence",
  "分支结构" = "lang_branch",
  "循环结构" = "lang_loop",
  "数组" = "lang_array",
  "字符串（入门）" = "lang_string",
  "函数与递归" = "lang_function_recursion",
  "结构体" = "lang_struct",
}
export enum StringPromblemTag {
  "字符串" = "problem_string",
  "后缀自动机SAM" = "problem_sam",
  "字典树，Trie" = "problem_trie",
  "KMP" = "problem_kmp",
  "AC自动机" = "problem_ac_automaton",
  "Manacher算法" = "problem_manacher",
  "回文自动机，PAM" = "problem_pam",
  "后缀数组，SA" = "problem_sa",
  "后缀树" = "problem_suffix_tree",
  "有限状态自动机" = "problem_finite_state_automaton",
  "Lydon分解" = "problem_lydon",
}
const LABLEVALUEMAP = [
  {
    title: "请选择标签",
    option: [
      { label: "按题型", value: PromblemTag["按题型"] },
      { label: "按难度", value: PromblemTag["按难度"] },
      { label: "按偏好", value: PromblemTag["按偏好"] },
      { label: "按时间", value: PromblemTag["按时间"] },
      { label: "按知识点", value: PromblemTag["按知识点"] },
      { label: "全部标签", value: PromblemTag["全部标签"] },
    ],
  },
  {
    title: "语言入门（请选择入门与面试题库）",
    option: [
      { label: "语言入门（请选择入门与面试题库）", value: LangTag["语言入门（请选择入门与面试题库）"] },
      { label: "顺序结构", value: LangTag["顺序结构"] },
      { label: "分支结构", value: LangTag["分支结构"] },
      { label: "循环结构", value: LangTag["循环结构"] },
      { label: "数组", value: LangTag["数组"] },
      { label: "字符串（入门）", value: LangTag["字符串（入门）"] },
      { label: "函数与递归", value: LangTag["函数与递归"] },
      { label: "结构体", value: LangTag["结构体"] },
    ],
  },
  {
    title: "字符串",
    option: [
      { label: "字符串", value: StringPromblemTag["字符串"] },
      { label: "后缀自动机SAM", value: StringPromblemTag["后缀自动机SAM"] },
    ],
  },
];
export default LABLEVALUEMAP;
