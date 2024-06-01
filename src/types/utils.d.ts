import { paths } from "./schema";

type ResponseType<P extends keyof paths> = paths[P]["responses"]["200"]["content"]["application/json"];
export type Response<P extends keyof paths> = ResponseType<P>;
