import { useEffect, useState } from "react";

export default function useClientOnly(doThrow = false) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      if (doThrow) throw new Promise<void>(() => {});
      setIsMounted(true);
    }
  }, [isMounted]);

  return isMounted;
}
