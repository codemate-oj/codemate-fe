import { RecordFilterFormType } from "@/components/record/record-filter-form";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import _ from "lodash";
import { useState } from "react";
import { useHydroWebSocket } from "./useHydroWebSocket";
import type { RecordRowType } from "@/components/record/record-list";
import { getTimeFromObjectId } from "@/lib/utils";

export default function useRecordMainConn(params: RecordFilterFormType = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [latestRowChange, setLatestRowChange] = useState<RecordRowType>();
  useHydroWebSocket("/record-conn", _.omitBy(params, _.isUndefined), {
    onMessage: async (message) => {
      const data = JSON.parse(message.data).data;
      setLatestRowChange({
        rid: data.rdoc._id,
        status: data.rdoc.status,
        score: data.rdoc.score,
        problem: data.pdoc,
        submitBy: data.udoc,
        time: data.rdoc.time,
        memory: data.rdoc.memory,
        lang: data.rdoc.lang === "_" ? "客观题" : PROGRAMMING_LANGS[data.rdoc.lang as keyof typeof PROGRAMMING_LANGS],
        submitAt: await getTimeFromObjectId(data.rdoc._id),
      });
    },
  });
  return latestRowChange;
}
