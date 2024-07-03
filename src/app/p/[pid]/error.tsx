"use client"; // Error components must be Client Components
import { Button, Result } from "antd";
import type { ResultStatusType } from "antd/es/result";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorDetailType {
  status: ResultStatusType;
  title: string;
  content?: string;
}

const ERROR_DETAIL_MAP: Record<string, ErrorDetailType> = {
  login: {
    status: "403",
    title: "用户未登录",
    content: "该题目需要解锁后才能访问，请登录后再次尝试访问",
  },
  不存在: {
    status: "404",
    title: "题目不存在",
  },
};

const getMatchedError = (err: Error) => {
  let info: ErrorDetailType = { status: "error", title: "页面崩溃了" };
  Object.keys(ERROR_DETAIL_MAP).forEach((key) => {
    if (err.message.includes(key)) {
      info = ERROR_DETAIL_MAP[key];
    }
  });
  return info;
};

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const info = getMatchedError(error);

  return (
    <div>
      <Result
        status={info.status}
        title={info.title}
        subTitle={info.content ?? error.message}
        extra={[
          <Button
            key="back"
            onClick={() => {
              window.history.length > 1 ? router.back() : router.push("/");
            }}
          >
            返回
          </Button>,
        ]}
      />
    </div>
  );
}
