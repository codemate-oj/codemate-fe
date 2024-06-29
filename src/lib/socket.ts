export function getWsUrl(url: string, params: Record<string, string> = {}) {
  const _url = new URL(`/api${url}`, `wss://beta.aioj.net`);
  const searchParams = new URLSearchParams(params);
  if (_url.host !== window.location.host && document.cookie.includes("sid=")) {
    searchParams.append("sid", document.cookie.split("sid=")[1].split(";")[0]);
  }
  _url.search = searchParams.toString();
  return _url.toString();
}
