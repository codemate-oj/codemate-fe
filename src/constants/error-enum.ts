export const enum ERROR_TYPE {
  UNKNOWN_SERVER_ERROR = -1,
}

export const ERROR_MAP: Record<ERROR_TYPE, string> = {
  [ERROR_TYPE.UNKNOWN_SERVER_ERROR]: "未知错误",
};
