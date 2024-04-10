import { z } from "zod";

export const emailSchema = z.string({ required_error: "请输入邮箱" }).email({ message: "请输入正确的邮箱" });

export const phoneSchema = z
  .string({ required_error: "请输入手机号" })
  .regex(/^1[3456789]\d{9}$/, { message: "请输入正确的手机号" });

export const unameSchema = z.string({
  required_error: "请输入用户名",
});

export const passwordSchema = z.string({
  required_error: "请输入密码",
});
// .min(8, "密码不能少于8位")
// .regex(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "密码需要同时包含字母和数字");
