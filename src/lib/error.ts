import { Method } from "alova";
import { parseTemplate } from "./utils";
import { ERROR_MAP, ERROR_TYPE, ERROR_CODE_MAP } from "@/constants/error-enum";

export class HydroError extends Error implements Hydro.HydroError {
  reqMethod?: Method;
  remoteErr: Hydro.HydroError;
  code: number;

  constructor(respErr: Hydro.HydroError, status: { code: number; text: string }, req?: Method) {
    let errCode: ERROR_TYPE = ERROR_TYPE.UNKNOWN_SERVER_ERROR; // 默认值
    if (!respErr) super(status.text);
    else {
      // 根据MAP表读取错误代码
      errCode = ERROR_CODE_MAP[respErr.message] ?? errCode;
      // 根据MAP表读取错误信息，解析模板字符串
      const errMsgTranslation = ERROR_MAP[errCode];
      const msg = parseTemplate(errMsgTranslation ?? respErr.message, respErr.params ?? []);
      super(msg);
    }
    this.remoteErr = respErr;
    this.reqMethod = req;
    this.code = errCode;
    if (respErr.stack) this.stack = respErr.stack;
  }
}

export const tryParseHydroResponse = async (resp: Response, method?: Method) => {
  const data = await resp.json();
  if (!resp.ok || resp.status !== 200 || data?.error) {
    throw new HydroError(data?.error, { code: resp.status, text: resp.statusText }, method);
  }
  return data;
};

export const catchHydroError = (err: unknown) => {
  if (err instanceof HydroError) return err;
  throw err;
};
