import GlobalFetch from "alova/GlobalFetch";
import { createAlovaMockAdapter } from "@alova/mock";

import homeMock from "./home";

const mockAdapter = createAlovaMockAdapter([homeMock], {
  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: GlobalFetch(),
  // mock接口响应延迟，单位毫秒
  delay: 100,
  // 是否打印mock接口请求信息
  mockRequestLogger: true,
  // 模拟接口回调，data为返回的模拟数据，你可以用它构造任何你想要的对象返回给alova
  // 以下为默认的回调函数，它适用于使用GlobalFetch请求适配器
  // 如果你使用的是其他请求适配器，在模拟接口回调中请自定义返回适合适配器的数据结构
  // onMockResponse: (data) => ({ response: new Response(JSON.stringify(data), headers) }),
  // 你可以在createAlovaMockAdapter中设置matchMode为methodurl，它将只匹配 method 实例中定义的 url
  matchMode: "methodurl",
});

export default mockAdapter;
