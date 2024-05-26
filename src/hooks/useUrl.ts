import { useState, useEffect, useCallback } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

const useUrl = () => {
  const [originUrlQueryParams, setOriginUrlQueryParams] = useState<Record<string, string>>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // 在组件挂载时获取并更新查询参数
  useEffect(() => {
    const parsed: Record<string, string> = {};
    const entries = Array.from(searchParams.entries());
    for (const [key, value] of entries) {
      parsed[key] = value;
    }
    setOriginUrlQueryParams(parsed);
  }, [searchParams]);

  const updateQueryParams = useCallback(
    (key: string, value: string) => {
      if (searchParams.get(key) === value) return;
      const updatedParams = {
        ...originUrlQueryParams,
        [key]: value,
      };
      const newUrl = qs.stringifyUrl({
        url: window.location.pathname,
        query: updatedParams,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      router.push(newUrl);
    },
    [originUrlQueryParams, router, searchParams]
  );

  return { queryParams: originUrlQueryParams, updateQueryParams };
};

export const useUrlParam = (key: string) => {
  const { queryParams, updateQueryParams } = useUrl();

  const value = queryParams[key];
  const setValue = useCallback(
    (value: string) => {
      updateQueryParams(key, value);
    },
    [key, updateQueryParams]
  );
  return [value, setValue] as const;
};

export default useUrl;
