"use client"; // Error components must be Client Components

import { Button, Result } from "antd";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <Result
        status="error"
        title="我们遇到了预期外的错误"
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
