import { Spin } from "antd";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={"text-center"}>
      <Spin tip="Loading" />
    </div>
  );
}
