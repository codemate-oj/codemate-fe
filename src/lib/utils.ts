import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

/**
 * A function that combines and merges class names.
 *
 * @param {ClassValue[]} inputs - An array of class values to be combined.
 * @return {string} The merged class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
export function isAbsoluteURL(url: string) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
export function getFullUrl(baseURL = "", relativeURL?: string) {
  // 将baseURL最后的斜杠和relativeURL最前面的斜杠去掉
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

/**
 * Replaces placeholders in a template string with values from an array.
 *
 * @param {string} template - The template string containing placeholders.
 * @param {string[]} values - An array of values to replace the placeholders.
 * @return {string} The updated template string with placeholders replaced.
 */
export function parseTemplate(template: string, values: string[]) {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return values[index] !== undefined ? values[index] : match;
  });
}

/**
 * 计算当前时间与给定时间之间的时间差。
 *
 * @param {Date} time - 参考时间。
 * @return {string} 时间差的描述字符串。
 */
export function getTimeDiffFromNow(time: Date) {
  const diff = dayjs().diff(time, "millisecond");

  if (diff < 60000) {
    return "一分钟内";
  } else if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}分钟前`;
  } else if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}小时前`;
  } else if (diff < 2592000000) {
    const days = Math.floor(diff / 86400000);
    return `${days}天前`;
  } else if (diff < 31536000000) {
    const months = Math.floor(diff / 2592000000);
    return `${months}月前`;
  } else {
    const years = Math.floor(diff / 31536000000);
    return `${years}年前`;
  }
}
export function isBrowser() {
  return typeof window !== "undefined";
}

export function remoteUrl(url?: string) {
  if (!url) return "";
  if (url.indexOf("://") > -1) {
    return url;
  }
  const CDN_PREFIX = process.env.CDN_PREFIX ?? "https://cdn.aioj.net/";
  if (url.startsWith("/")) return CDN_PREFIX + url.slice(1);
  return CDN_PREFIX + url;
}

// 计算时间差，time1 - time2
export function calculateTimeDifference(time1: string, time2: string): number {
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours;
}

//时间格式化为 "YYYY-MM-DD HH:mm"
export function formatTime(time: string) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
