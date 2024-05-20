import { Method } from "alova";
import { parseTemplate } from "./utils";
import ErrCodeMap from "@/constants/error.yml";
import { ERROR_MAP, ERROR_TYPE } from "@/constants/error-enum";

export class HydroError extends Error implements Hydro.HydroError {
  reqMethod?: Method;
  remoteErr: Hydro.HydroError;
  code: number;

  constructor(respErr: Hydro.HydroError, status: { code: number; text: string }, req?: Method) {
    let errCode: ERROR_TYPE = -1;
    if (!respErr) super(status.text);
    else {
      if (ErrCodeMap[respErr.message]) errCode = ErrCodeMap[respErr.message];
      const errInfo = ERROR_MAP[errCode];
      // 若为已知错误则调用现有翻译
      const msgTemplate = errCode === ERROR_TYPE.UNKNOWN_SERVER_ERROR ? respErr.message : errInfo.text;
      const msg = parseTemplate(msgTemplate, respErr.params ?? []);
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