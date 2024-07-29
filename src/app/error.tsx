"use client"; // Error components must be Client Components

import { Button, Result } from "antd";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <Result
        status="error"
        title="我们遇到了预期外的错误。欢迎反馈，用户技术支持QQ群：688796003，反馈时请给出详细的错误信息。"
        subTitle={error.message}
        extra={[
          <Button key="back" onClick={reset}>
            重试
          </Button>,
        ]}
      />
    </div>
  );
}
