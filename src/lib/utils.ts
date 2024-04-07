import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
export function combineURLs(baseURL = "", relativeURL?: string) {
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
  return template.replace(/{(\d+)}/g, function (match, index) {
    return values[index] !== undefined ? values[index] : match;
  });
}
