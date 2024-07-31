export function getWsUrl(url: string, params: Record<string, string> = {}) {
  const _url = new URL(url, "wss://api.aioj.net");
  const searchParams = new URLSearchParams(params);
  _url.search = searchParams.toString();
  return _url.toString();
}
