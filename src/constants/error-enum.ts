export const enum ERROR_TYPE {
  UNKNOWN_SERVER_ERROR = -1,
  VALIDATION_ERROR = 1,
  USER_NOT_FOUND_ERROR = 2,
  USER_ALREADY_EXISTS_ERROR = 3,
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
};
