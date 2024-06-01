import dayjs from "dayjs";
import React from "react";
import Image from "next/image";

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
    <div className="w-full py-3 text-[#3d3d3d] flex items-center">
      <span className="min-w-[120px]">{pid}</span>
      <span className="flex-1 flex items-center">
        {name}
        {isFault && (
          <Image src="/svg/train-error-icon.svg" width={12} height={12} alt="fault" className="ml-5 h-[12px]" />
        )}
      </span>
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
