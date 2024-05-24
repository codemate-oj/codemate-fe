import { useEffect, useState } from "react";

export default function useClientOnly(doThrow = false) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
