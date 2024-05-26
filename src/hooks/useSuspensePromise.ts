import { useEffect, useState } from "react";

/**
 * 这是一个Promise Helper函数，旨在配合Suspense使用，在Promise未完成时抛出Promise
 * 以在Suspense处被捕获到
 * @param promise 传入的Promise请保证不会变化
 * @returns 封装后的Promise
 */
export default function useSuspensePromise<T>(promise: Promise<T>) {
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (isPending) throw promise;
  }, [isPending]);

  return promise
    .then((val) => {
      setIsPending(false);
      return val;
    })
    .catch((e) => {
      throw e;
    });
}
