import dayjs from "dayjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface ItemDataType {
  pid: string;
  name?: string;
  time?: Date;
}

interface ItemProps extends ItemDataType {
  isFault?: boolean;
  timePrefix?: string;
}

export const Item: React.FC<ItemProps> = ({ pid, name, time, isFault, timePrefix }) => {
  return (
    <div className="flex w-full items-center py-3 text-[#3d3d3d]">
      <Link href={`/p/${pid}`} target="_blank" className="min-w-[120px]">
        {pid}
      </Link>
      <Link href={`/p/${pid}`} target="_blank" className="flex flex-1 items-center">
        {name}
        {isFault && (
          <Image src="/svg/train-error-icon.svg" width={12} height={12} alt="fault" className="ml-5 h-[12px]" />
        )}
      </Link>
      {time && (
        <span className="text-sm">
          {timePrefix}
          {dayjs(time).format("YYYY年MM月DD日 HH:mm:ss")}
        </span>
      )}
    </div>
  );
};

export default Item;
