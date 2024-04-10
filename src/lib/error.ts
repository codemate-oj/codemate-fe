import { Method } from "alova";
import { parseTemplate } from "./utils";

export class HydroError extends Error implements Hydro.HydroError {
  reqMethod?: Method;
  remoteErr: Hydro.HydroError;
  constructor(respErr: Hydro.HydroError, status: { code: number; text: string }, req?: Method) {
    if (!respErr) super(status.text);
    else {
      const msgTemplate = respErr.message ?? "Unexpected error";
      const placeholders = respErr.params ?? [];
      const msg = parseTemplate(msgTemplate, placeholders);
      super(msg);
    }
    this.remoteErr = respErr;
    this.reqMethod = req;
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
