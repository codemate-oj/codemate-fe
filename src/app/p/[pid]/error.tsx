"use client"; // Error components must be Client Components
import { useProblemPermission } from "@/hooks/useProblemPermission";
import { Button, Result } from "antd";
import type { ResultStatusType } from "antd/es/result";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

enum ProblemDetailError {
  NotLogin,
  NotFound,
  NoPermission,
  Unknown = -1,
}

interface ErrorDetailType {
  status: ResultStatusType;
  category: ProblemDetailError;
  title: string;
  content?: string;
}

const ERROR_DETAIL_MAP: Record<string, ErrorDetailType> = {
  login: {
    status: "403",
    category: ProblemDetailError.NotLogin,
    title: "用户未登录",
    content: "该题目需要解锁后才能访问，请登录后再次尝试访问",
  },
  不存在: {
    status: "404",
    category: ProblemDetailError.NotFound,
    title: "题目不存在",
  },
  "View hidden problem": {
    status: "403",
    category: ProblemDetailError.NoPermission,
    title: "您无权访问此题目",
    content: "访问该题目需要解锁特定权限，您可以在下方尝试解锁题目",
  },
};

const getMatchedError = (err: Error) => {
  let info: ErrorDetailType = { status: "error", title: "页面崩溃了", category: ProblemDetailError.Unknown };
  Object.keys(ERROR_DETAIL_MAP).forEach((key) => {
    if (err.message.includes(key)) {
      info = ERROR_DETAIL_MAP[key];
    }
  });
  return info;
};

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const pid = pathname.split("/")[2];

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const info = getMatchedError(error);

  const { runCheckProblemPermission } = useProblemPermission();

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
          info.category === ProblemDetailError.NoPermission && (
            <Button
              key="unlock"
              type="primary"
              onClick={() => {
                runCheckProblemPermission({ pid });
              }}
            >
              解锁
            </Button>
          ),
        ]}
      />
    </div>
  );
}
