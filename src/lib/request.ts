import { createAlova } from "alova";
import ReactHook from "alova/react";
import GlobalFetch from "alova/GlobalFetch";
import mockAdapter from "@/mock";

const BASE_URL = process.env.API_BASE_URL ?? "/";

export const alovaInstance = createAlova({
  baseURL: BASE_URL,
  statesHook: ReactHook,
  timeout: 1000,
  localCache: null, // FIXME: 暂时关闭缓存 因为会直接存储Response对象 导致再次请求报错
  requestAdapter: process.env.NODE_ENV === "development" ? mockAdapter : GlobalFetch(),
  beforeRequest(method) {
    // 缺省状态下默认添加 Accept: application/json
    const acc = method.config.headers["Accept"];
    if (!acc) method.config.headers["Accept"] = "application/json";
  },
});

export const request = {
  get: <T>(...args: Parameters<typeof alovaInstance.Get<Response, T>>) => {
    return alovaInstance.Get(args[0], {
      ...(args[1] ?? {}),
      headers: {
        Accept: "application/json",
        ...(args[1]?.headers ?? {}),
      },
    });
  },
  post: <T>(...args: Parameters<typeof alovaInstance.Post<Response, T>>) => {
    return alovaInstance.Post(args[0], args[1], {
      ...(args[2] ?? {}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        ...(args[2]?.headers ?? {}),
      },
    });
  },
};

export async function sendRequest<T>(fetcher: ReturnType<typeof request.get<T>> | ReturnType<typeof request.post<T>>) {
  const resp = await fetcher.send();
  return (await resp.json()) as T;
}
