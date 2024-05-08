import { createAlova } from "alova";
import ReactHook from "alova/react";
import GlobalFetch from "alova/GlobalFetch";
import mockAdapter from "@/mock";
import qs from "qs";
import { tryParseHydroResponse } from "./error";

const IS_DEV = process.env.NODE_ENV === "development";

const BASE_URL = "/api";
const APIFOX_TOKEN = process.env.NEXT_PUBLIC_APIFOX_TOKEN; // 用于云端mock鉴权
const DISABLE_CACHE = IS_DEV || process.env.DISABLE_CACHE === "true"; // 用于停用请求库内建的缓存，对next缓存无效
const LOCAL_MOCK = IS_DEV || process.env.LOCAL_MOCK === "true"; // 是否使用alova内置的本地mock服务（DEV环境下默认启用）

export interface AlovaResponse<T = Hydro.HydroResponse> {
  status: number;
  statusText: string;
  header: Headers;
  data: T;
}

export const alovaInstance = createAlova({
  baseURL: BASE_URL,
  statesHook: ReactHook,
  timeout: 1000,
  localCache: DISABLE_CACHE ? null : { GET: 60000 },
  requestAdapter: LOCAL_MOCK ? mockAdapter : GlobalFetch(),
  // requestAdapter: mockAdapter, // FIXME： 由于跨域没有配置好 先全部使用mock
  beforeRequest(method) {
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
    const _resp: AlovaResponse = {
      status: resp.status,
      statusText: resp.statusText,
      header: resp.headers,
      data,
    };
    return _resp;
  },
});

export const request = {
  get: <T = Hydro.HydroResponse>(...args: Parameters<typeof alovaInstance.Get<AlovaResponse<T>>>) => {
    const [url, config = {}] = args;
    return alovaInstance.Get(url, {
      ...config,
      headers: {
        Accept: "application/json",
        ...(config.headers ?? {}),
      },
      mode: "cors",
    });
  },
  post: <T = Hydro.HydroResponse>(...args: Parameters<typeof alovaInstance.Post<AlovaResponse<T>>>) => {
    let [url, data, config = {}] = args;
    let contentType = config.headers?.["Content-Type"] ?? "application/x-www-form-urlencoded";
    if (data instanceof FormData) contentType = "multipart/form-data";
    if (contentType === "application/x-www-form-urlencoded") {
      data = qs.stringify(data);
    }
    return alovaInstance.Post(url, data, {
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
