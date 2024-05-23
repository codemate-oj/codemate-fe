import "server-only"; // 仅在RSC能使用
import { cookies } from "next/headers";
import { Arg } from "alova";

/**
 * 在请求时React Server Component，从请求头中获取Cookie信息，并生成Authorization头
 *
 * @return 包含Authorization头的Headers，可以与其他Config直接合并使用
 */
export function forwardAuthHeader(): Arg {
  const sid = cookies().get("sid");
  if (!sid) return {};
  return {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${sid?.value ?? ""}`,
    },
  };
}
