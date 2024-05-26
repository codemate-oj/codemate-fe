import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUrlParamState = (key: string, defaultValue?: string) => {
  const [value, _setValue] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setValue = useCallback(
    (val: string) => {
      _setValue(val);
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, val);
      router.push(
        //@ts-expect-error 开启了静态路由后会报错
        `${pathname}?${newParams.toString()}`
      );
    },
    [key, pathname, router, searchParams]
  );

  // 从URL读取并同步状态
  useEffect(() => {
    const val = searchParams.get(key);
    if (val) {
      _setValue((old) => {
        if (old === val) return old;
        return val;
      });
    }
  }, [searchParams, key, _setValue]);

  // 在没有URL参数时设置默认值
  useEffect(() => {
    const val = searchParams.get(key);
    if (!val && defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue, setValue, key, searchParams]);

  return [value, setValue] as const;
};
