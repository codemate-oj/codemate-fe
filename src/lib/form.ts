import { z } from "zod";
import yaml from "js-yaml";

export const emailSchema = z.string({ required_error: "请输入邮箱" }).email({ message: "请输入正确的邮箱" });
export const phoneSchema = z
  .string({ required_error: "请输入手机号" })
  .regex(/^1[3456789]\d{9}$/, { message: "请输入正确的手机号" });
export const unameSchema = z
  .string({
    required_error: "请输入用户名",
  })
  .regex(/^(.{3,31}|[\u4e00-\u9fa5]{2})$/, "用户名不能少于3位或超过31位，或者是汉字");
export const passwordSchema = z.string({
  required_error: "请输入密码",
});
// 密码长度8-16位数，必须包含数字字母
export const createPasswordSchema = z
  .string({
    required_error: "请输入密码",
  })
  .regex(/^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/, "密码长度8-16位数，必须包含数字字母");

export const smsCode = z.string({
  required_error: "请输入短信验证码",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToFormData(obj: Record<string, any>) {
  const formData = new FormData();
  for (const key in obj) {
    let value: string | Blob = "";
    if (typeof obj[key] === "string" || obj[key] instanceof File) {
      value = obj[key];
    } else {
      try {
        value = obj[key].toString();
      } catch (e) {
        console.error(e);
        value = JSON.stringify(obj[key]);
      }
    }
    formData.append(key, value);
  }
  return formData;
}

export function objectToYaml(obj: { [key: string]: number | string }) {
  try {
    if (Object.keys(obj).length < 1) return;
    const newObj: { [key: string]: number | string | string[] } = {};

    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      newObj[i + 1] =
        typeof obj[keys[i]] == "number" ? String.fromCharCode(65 + (obj[keys[i]] as number)) : (obj[keys[i]] as string);
    }
    // newObj[2] = ["A", "B", "C"];
    const yamlData = yaml.dump(newObj);

    return yamlData;
  } catch (e) {
    console.error("Error converting object to YAML:", e);
    return null;
  }
}
