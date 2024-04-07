import { z } from "zod";

export const emailSchema = z.string().email({ message: "请输入正确的邮箱" });
export const phoneSchema = z.string().regex(/^1[3456789]\d{9}$/, { message: "请输入正确的手机号" });
