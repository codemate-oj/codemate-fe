import { useState, useEffect } from "react";
import queryString from "query-string";
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

  const updateQueryParams = (key: string, value: string) => {
    if (searchParams.get(key) === value) return;
    const updatedParams = {
      ...originUrlQueryParams,
      [key]: value,
    };
    const newUrl = queryString.stringifyUrl({
      url: window.location.pathname,
      query: updatedParams,
    });
    //@ts-ignore
    router.push(newUrl);
  };

  return { queryParams: originUrlQueryParams, updateQueryParams };
};

export default useUrl;
