import { Skeleton } from "antd";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      {new Array(5).fill(0).map((_, index) => {
        return <Skeleton className={"pb-2"} key={index} active paragraph={{ rows: 4 }} />;
      })}
    </div>
  );
}
