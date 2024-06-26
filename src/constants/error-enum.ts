export const enum ERROR_TYPE {
  UNKNOWN_SERVER_ERROR = -1,
  VALIDATION_ERROR = 1,
  USER_NOT_FOUND_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  INVALID_PASSWORD_ERROR,
  PROBLEM_LIST_NOT_FOUND_ERROR,
  PRIVATE_PROBLEM_LIST_FORBIDDEN_ERROR,
  PROBLEM_NOT_FOUND_IN_LIST_ERROR,
  PROBLEM_HAS_NO_PREV_ERROR,
  PROBLEM_HAS_NO_NEXT_ERROR,
}

interface ErrorInfo {
  text: string;
  title?: string;
  raw?: string;
}

export const ERROR_MAP: Record<ERROR_TYPE, ErrorInfo> = {
  [ERROR_TYPE.UNKNOWN_SERVER_ERROR]: {
    text: "服务器内部错误",
  },
  [ERROR_TYPE.VALIDATION_ERROR]: {
    text: "参数{0}校验失败",
  },
  [ERROR_TYPE.USER_NOT_FOUND_ERROR]: {
    text: "用户{0}不存在",
  },
  [ERROR_TYPE.USER_ALREADY_EXISTS_ERROR]: {
    text: "用户{0}已存在",
  },
  [ERROR_TYPE.INVALID_PASSWORD_ERROR]: {
    text: "密码错误",
  },
  [ERROR_TYPE.PROBLEM_LIST_NOT_FOUND_ERROR]: {
    text: "题单{0}不存在",
  },
  [ERROR_TYPE.PRIVATE_PROBLEM_LIST_FORBIDDEN_ERROR]: {
    text: "私有题单{0}禁止访问",
  },
  [ERROR_TYPE.PROBLEM_NOT_FOUND_IN_LIST_ERROR]: {
    text: "题单{0}中没有题目{1}",
  },
  [ERROR_TYPE.PROBLEM_HAS_NO_PREV_ERROR]: {
    text: "该题目已经是第一题了",
  },
  [ERROR_TYPE.PROBLEM_HAS_NO_NEXT_ERROR]: {
    text: "该题目已经是最后一题了",
  },
};
