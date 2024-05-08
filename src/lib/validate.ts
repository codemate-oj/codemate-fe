import { z } from "zod";

export const emailSchema = z.string({ required_error: "请输入邮箱" }).email({ message: "请输入正确的邮箱" });

export const phoneSchema = z
  .string({ required_error: "请输入手机号" })
  .regex(/^1[3456789]\d{9}$/, { message: "请输入正确的手机号" });

export const unameSchema = z
  .string({
    required_error: "请输入用户名",
  })
  .regex(/^(.{3,31}|[\u4e00-\u9fa5]{2})$/, "用户名不能少于3位或超过31位，或者是汉字");

export const passwordSchema = z
  .string({
    required_error: "请输入密码",
  })
  .min(6, "密码不能少于6位")
  .max(255, "密码不能超过255位");
// .regex(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, "密码需要同时包含字母和数字");
