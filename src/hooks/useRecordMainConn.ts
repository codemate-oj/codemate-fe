import { RecordFilterFormType } from "@/components/record/record-filter-form";
import { PROGRAMMING_LANGS } from "@/constants/misc";
import { useWebSocket } from "ahooks";
import _ from "lodash";
import { useRef, useState } from "react";

export default function useRecordMainConn(params: RecordFilterFormType = {}) {
  const searchParams = new URLSearchParams(_.omitBy(params, _.isUndefined) as Record<string, string>);
  const pingpongRef = useRef<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [latestRowChange, setLatestRowChange] = useState<any>();
  const {} = useWebSocket(`ws://api.aioj.net/record-conn?${searchParams.toString()}`, {
    reconnectLimit: 100,
    reconnectInterval: 10000,
    onOpen: (_, ws) => {
      pingpongRef.current = setInterval(() => {
        ws.send("ping");
      }, 30000);
    },
    onMessage: async (message, ws) => {
      const ObjectId = (await import("bson")).ObjectId;
      if (message.data === "pong") return;
      if (message.data === "ping") {
        ws.send("pong");
        return;
      } else {
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
          submitAt: ObjectId.createFromHexString(data.rdoc._id).getTimestamp(),
        });
      }
    },
    onClose: () => {
      if (pingpongRef.current) {
        clearInterval(pingpongRef.current);
      }
    },
  });

  return latestRowChange;
}
