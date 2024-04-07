import { useRequest } from "alova";

export default function useHydroRequest(...args: Parameters<typeof useRequest>) {
  const { loading, error, data, ...rest } = useRequest(...args);
  // 接入Suspense和ErrorBoundary
  if (loading) {
    throw new Promise((res, rej) => {
      if (error) {
        rej(error);
        return;
      }
      if (data) res(data);
    });
  }
  return { loading, error, data, ...rest };
}
