import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import type { ObjectId } from "bson";

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

/**
 * 计算当前给定两个时间的差值的时间差。
 * time1-time2
 * @param {Date} time1 - 参考时间。
 * @param {Date} time2 - 参考时间。
 * @return {string} 时间差（小时）。
 */
export function getTimeDiffByHour(time1: string, time2: string): number {
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours;
}

//时间格式化为 "YYYY-MM-DD HH:mm"
export function formatTime(time: string) {
  const date = dayjs(time);

  return date.format("YYYY-MM-DD HH:mm");
}

//获取比赛状态
export const getDetailState = (props: {
  beginAt: string;
  endAt: string;
  checkinBeginAt?: string;
  checkinEndAt?: string;
}) => {
  const { endAt, checkinBeginAt, checkinEndAt } = props;
  const nowDate = new Date();
  const endDate = new Date(endAt);
  const checkinBeginDate = new Date(checkinBeginAt as string);
  const checkinEndDate = new Date(checkinEndAt as string);
  if (nowDate < checkinBeginDate) return "预告中";
  else if (nowDate < checkinEndDate) return "可报名";
  else if (nowDate < endDate) return "进行中";
  else return "已结束";
};

export function getScoreColor(score: number | string): string {
  if (score === null || score === undefined || !Number.isFinite(+score)) return "#000000";
  return [
    "#ff4f4f",
    "#ff694f",
    "#f8603a",
    "#fc8354",
    "#fa9231",
    "#f7bb3b",
    "#ecdb44",
    "#e2ec52",
    "#b0d628",
    "#93b127",
    "#25ad40",
  ][Math.floor((Number(score) || 0) / 10)];
}

export async function getTimeFromObjectId(ObjectId: ObjectId | string) {
  const OID = (await import("bson")).ObjectId;
  return new OID(ObjectId).getTimestamp();
}
