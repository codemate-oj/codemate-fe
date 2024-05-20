import { useEffect, useMemo, useState } from "react";
import { CONTEST_STATUS_TAG, CONTEST_FILTER_DIR } from "@/app/(home)/contest/const";
import { Button } from "antd";
import Image from "next/image";
import useUrl from "@/hooks/useUrl";

interface ContestItemProps {
  item: ContestBase;
}

export interface ContestBase {
  _id: string;
  docId: string;
  docType: number;
  beginAt: string;
  endAt: string;
  attend: number;
  title: string;
  content: string;
  rule: string;
  pids: number[];
}

const transformDate = (timeString: string) => {
  let date = new Date(timeString);

  // 获取年、月和日
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // 月份从 0 开始，所以要加 1
  let day = date.getDate();

  return year + "年" + month + "月" + day + "日";
};

const getContinueTime = (begin: string, end: string) => {
  let startTime = new Date(begin);
  let endTime = new Date(end);
  let timeDiff = endTime.getTime() - startTime.getTime();
  let hours = Math.floor(timeDiff / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  return hours + "小时" + (minutes !== 0 ? minutes + "分" : "");
};

const ContestStatusTag = ({ beginAt, endAt }: { beginAt: string; endAt: string }) => {
  const [tagStatus, setTagStatus] = useState(CONTEST_STATUS_TAG.IN_COMING);
  useEffect(() => {
    const now = new Date().getTime();
    const begin = new Date(beginAt).getTime();
    const end = new Date(endAt).getTime();
    if (now < begin) {
      setTagStatus(CONTEST_STATUS_TAG.IN_COMING);
    } else if (now >= begin && now <= end) {
      setTagStatus(CONTEST_STATUS_TAG.ON_GOING);
    } else if (now > end) {
      setTagStatus(CONTEST_STATUS_TAG.DONE);
    }
  }, [beginAt, endAt]);
  return <div></div>;
};

const ContestItem = ({ item }: ContestItemProps) => {
  const { queryParams } = useUrl();
  const contest_tag = useMemo(() => {
    if (queryParams["tid"]) {
      const query = queryParams["tid"].split(",");
      //@ts-ignore
      return CONTEST_FILTER_DIR[query[0]];
    } else {
      return "全部";
    }
  }, [queryParams]);
  const continueTime = useMemo(() => {
    return getContinueTime(item.beginAt, item.endAt);
  }, [item.beginAt, item.endAt]);
  const beginTime = useMemo(() => {
    return transformDate(item.beginAt);
  }, [item.beginAt]);
  const endTime = useMemo(() => {
    return transformDate(item.endAt);
  }, [item.endAt]);
  return (
    <div className={"flex "}>
      <div className={"h-60 mr-3"}>
        <Image src={`/img/video.png`} alt={"contest"} width={500} height={240}></Image>
      </div>
      <div>
        <div className={"text-lg font-bold mb-3"}>
          <div className={"flex justify-between"}>
            <div>【 {item.docId} 】</div>
            <div
              className={"bg-gray-200 text-sm font-medium pl-4 pr-4 rounded-l-full flex items-center justify-center"}
            >
              <div>{contest_tag}</div>
            </div>
          </div>
          <div>{item.title}</div>
        </div>
        <div className={"flex mb-6"}>
          <div className={"flex flex-col mr-10"}>
            <div className={"text-gray-800 text-lg font-medium"}>{item.rule}</div>
            <div className={"text-gray-600 text-base"}>赛制</div>
          </div>
          <div className={"flex flex-col mr-10"}>
            <div className={"text-gray-800 text-lg font-medium"}>{continueTime}</div>
            <div className={"text-gray-600 text-base"}>时长</div>
          </div>
          <div className={"flex flex-col mr-10"}>
            <div className={"text-gray-800 text-lg font-medium"}>{item.attend}人</div>
            <div className={"text-gray-600 text-base"}>已报名</div>
          </div>
          <div className={"flex flex-col mr-10"}>
            <div className={"text-orange-500 text-lg font-medium"}>图形化</div>
            <div className={"text-gray-600 text-base"}>语言</div>
          </div>
        </div>
        <div className={"flex justify-between"}>
          <div className={"text-sm"}>
            <div className="mb-3">
              报名时间：{beginTime}-{endTime}
            </div>
            <div>
              比赛时间：{beginTime}-{endTime}
            </div>
          </div>
          <Button className={"self-end"} type={"primary"}>
            查看详情
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContestItem;
