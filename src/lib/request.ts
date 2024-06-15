/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestBody, createAlova } from "alova";
import ReactHook from "alova/react";
import GlobalFetch from "alova/GlobalFetch";
import mockAdapter from "@/mock";
import qs from "qs";
import { tryParseHydroResponse } from "./error";
import { paths } from "@/types/schema";
import { objectToFormData } from "./form";
import { isBrowser } from "./utils";

const IS_DEV = process.env.NODE_ENV === "development";

const BASE_URL = isBrowser() ? "/api" : process.env.API_URL ?? "https://beta.aioj.net/";
const APIFOX_TOKEN = process.env.NEXT_PUBLIC_APIFOX_TOKEN; // 用于云端mock鉴权
const DISABLE_CACHE = IS_DEV || process.env.DISABLE_CACHE === "true"; // 用于停用请求库内建的缓存，对next缓存无效
const LOCAL_MOCK = IS_DEV || process.env.LOCAL_MOCK === "true"; // 是否使用alova内置的本地mock服务（DEV环境下默认启用）

export interface AlovaResponse<T = Hydro.HydroResponse> {
  header: Headers;
  data: T;
}

export const alovaInstance = createAlova({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? BASE_URL,
  statesHook: ReactHook,
  timeout: 5000,
  localCache: DISABLE_CACHE ? null : { GET: 60000 }, // 默认GET缓存60s
  requestAdapter: LOCAL_MOCK ? mockAdapter : GlobalFetch(),
  beforeRequest(method) {
    if (IS_DEV) {
      console.info(`[alova] ${method.type} ${method.url}`);
    }
    // 缺省状态下默认添加 Accept: application/json
    const _acc = method.config.headers["Accept"];
    if (!_acc) method.config.headers["Accept"] = "application/json";
    // 若有apifoxToken则添加到Header
    if (APIFOX_TOKEN) method.config.headers["apifoxToken"] = APIFOX_TOKEN;
    // 去除config.params中的空值
    if (method.config.params) {
      Object.keys(method.config.params).forEach((key) => {
        if (!method.config.params[key]) delete method.config.params[key];
      });
    }
  },
  async responded(resp) {
    // 添加全局响应劫持器 处理响应并抛出错误（使其可以正常与缓存机制运作）
    const data = await tryParseHydroResponse(resp);

    // 尝试解析UserContext
    if (data?.UserContext && typeof data.UserContext === "string") {
      try {
        data.UserContext = JSON.parse(data.UserContext);
      } catch (e) {
        console.error(e);
        data.UserContext = null;
      }
    }

    const ret: AlovaResponse = {
      header: resp.headers,
      data,
    };

    return ret;
  },
});

type AllowedHTTPMethods = "get" | "post";

type PathsHavingMethod<M extends AllowedHTTPMethods> = {
  [K in keyof paths]: M extends keyof paths[K] ? K : never;
}[keyof paths];

type MethodParameters<M extends AllowedHTTPMethods, T extends keyof paths> = M extends keyof paths[T]
  ? paths[T][M] extends { parameters: { query?: infer Q } }
    ? Q
    : never
  : never;

type MethodRequestBody<M extends AllowedHTTPMethods, T extends keyof paths> = M extends keyof paths[T]
  ? paths[T][M] extends { requestBody?: { content: infer C } }
    ? C extends { "application/json": infer J }
      ? J
      : C extends { "application/x-www-form-urlencoded": infer F }
        ? F
        : never
    : never
  : never;

type MethodResponse<M extends AllowedHTTPMethods, T extends keyof paths> = M extends keyof paths[T]
  ? paths[T][M] extends { responses: { 200: { content: { "application/json": infer S } } } }
    ? S
    : never
  : never;

export const request = {
  get: <P extends PathsHavingMethod<"get">, R = any>(
    url: P,
    config: Parameters<typeof alovaInstance.Get<R, AlovaResponse<MethodResponse<"get", P>>>>[1] & {
      params?: MethodParameters<"get", P>;
    } = {}
  ) => {
    const { params, ...rest } = config;
    return alovaInstance.Get(url, {
      ...rest,
      params,
      headers: {
        Accept: "application/json",
        ...(config.headers ?? {}),
      },
      mode: "cors",
      next: { revalidate: 60 }, // 设置静态请求缓存时间为60秒，可以过滤一些高频请求
    });
  },
  post: <P extends PathsHavingMethod<"post">, R = any>(
    url: P,
    data?: MethodRequestBody<"post", P>,
    config: Parameters<typeof alovaInstance.Post<R, AlovaResponse<MethodResponse<"post", P>>>>[2] & {
      params?: MethodParameters<"post", P>;
    } = {}
  ) => {
    let payload: RequestBody | undefined = data;
    const contentType: string = config.headers?.["Content-Type"] ?? "application/x-www-form-urlencoded";

    if (data) {
      // 处理自动序列化逻辑
      switch (contentType) {
        case "application/x-www-form-urlencoded":
          payload = qs.stringify(data);
          break;
        case "multipart/form-data":
          payload = objectToFormData(data);
          break;
        default:
          break;
      }
    }

    return alovaInstance.Post(url, payload, {
      ...config,
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        ...(config.headers ?? {}),
      },
      mode: "cors",
    });
  },
};
