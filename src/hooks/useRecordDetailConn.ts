import type { RecordDoc } from "@/components/record/detail-page";
import { useHydroWebSocket } from "./useHydroWebSocket";
import { useEffect, useState } from "react";

export default function useRealtimeRecordDetail(rid = "", defaultValue?: RecordDoc) {
  const [rdoc, setRdoc] = useState(defaultValue);

  const { latestMessage } = useHydroWebSocket(`/record-detail-conn`, { rid, domainId: "system" });

  useEffect(() => {
    const data = JSON.parse(latestMessage?.data || "{}");
    if ("rdoc" in data && data.rdoc) {
      setRdoc(data.rdoc);
    }
  }, [latestMessage]);

  return rdoc;
}
