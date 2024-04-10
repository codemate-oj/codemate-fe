import { Method } from "alova";

export class RequestError extends Error {
  method?: Method;
  constructor(msg: string, req?: Method) {
    super(msg);
    this.method = req;
  }
}
