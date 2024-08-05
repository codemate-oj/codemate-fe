"use client";

import { useProblemPermission } from "@/hooks/useProblemPermission";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  pid: string | number;
}

const PermissionError: React.FC<IProps> = ({ pid }) => {
  const router = useRouter();

  const { runCheckProblemPermission } = useProblemPermission();

  return (
    <Result
      status={403}
      title="您无权访问此题目"
      subTitle="该题目需要解锁后访问，您可以在下方尝试解锁题目"
      extra={[
        <Button
          key="back"
          onClick={() => {
            window.history.length > 1 ? router.back() : router.push("/");
          }}
        >
          返回首页
        </Button>,
        <Button
          key="unlock"
          type="primary"
          onClick={() => {
            runCheckProblemPermission({ pid });
          }}
        >
          解锁
        </Button>,
      ]}
    />
  );
};

export default PermissionError;
