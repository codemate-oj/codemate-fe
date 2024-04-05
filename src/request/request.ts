import axios from "axios";
import { message } from "antd";

let API_BASE_URL = "";

if (process.env.NEXT_PUBLIC_API_MOCK === "true") {
  API_BASE_URL = "/api/mock";
}

export const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      message.warning("网络请求异常 - " + response.status);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
