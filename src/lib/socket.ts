export function getWsUrl(url: string, params: Record<string, string> = {}) {
  const _url = new URL(`/api${url}`, `wss://beta.aioj.net`);
  const searchParams = new URLSearchParams(params);
  _url.search = searchParams.toString();
  return _url.toString();
}
