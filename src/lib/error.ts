import { Method } from "alova";
import { parseTemplate } from "./utils";
import ErrCodeMap from "@/constants/error.yml";
import CnTranslate from "@/constants/cn.yml";

export class HydroError extends Error implements Hydro.HydroError {
  reqMethod?: Method;
  remoteErr: Hydro.HydroError;
  code: number;

  constructor(respErr: Hydro.HydroError, status: { code: number; text: string }, req?: Method) {
    if (!respErr) super(status.text);
    else {
      const msgTemplate = CnTranslate[respErr.message] ?? respErr.message ?? "Unexpected error";
      const placeholders = respErr.params ?? [];
      const msg = parseTemplate(msgTemplate, placeholders);
      super(msg);
    }
    this.remoteErr = respErr;
    this.reqMethod = req;
    this.code = ErrCodeMap[respErr.message] ?? -1;
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
