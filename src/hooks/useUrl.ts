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
      //@ts-ignore
      router.push(newUrl);
    },
    [originUrlQueryParams, router, searchParams]
  );

  return { queryParams: originUrlQueryParams, updateQueryParams };
};

interface UseUrlParamOption {
  defaultValue?: string;
  validator?: (value?: string) => boolean;
}

export const useUrlParam = <T extends string = string>(key: string, options?: UseUrlParamOption) => {
  const { validator = () => true, defaultValue } = options || {};
  const { queryParams, updateQueryParams } = useUrl();

  const value = (queryParams[key] ?? defaultValue ?? "") as T;
  const setValue = useCallback(
    (value: string) => {
      if (!validator(value)) {
        throw new Error("Invalid url param value");
      }
      updateQueryParams(key, value);
    },
    [key, updateQueryParams]
  );

  return [value, setValue] as const;
};

export default useUrl;
