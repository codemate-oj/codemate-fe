import { Collapse } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import type { CollapseProps } from "antd";
import "./styles.css";

export interface BullltinItemProps {
  id: string;
  title: string;
  postTime: number;
  href: NavItemType["href"];
}

const BulletinItem = (props: BullltinItemProps) => {
  // 通过静态方法获取
  const { title, postTime, href } = props;

  return (
    <div className="mb-3">
      <Link className={`text-gray-900 hover:text-[#FF7D37]`} target="_blank" href={href}>
        {title}
      </Link>
      <div className="mt-[32px] flex flex-col text-sm text-[#B9B9B9]">
        <span>{dayjs(postTime).format("YYYY-M-D HH:mm")}</span>
      </div>
    </div>
  );
};

export interface BulletinCardProps {
  key: string;
  label: string;
  children: BullltinItemProps[];
}

const BulletinList = ({ children }: BulletinCardProps) => {
  return (
    <>
      {children.map((child) => (
        <BulletinItem key={child.id} {...child}></BulletinItem>
      ))}
    </>
  );
};

export interface BulletinBoardProps {
  data: BulletinCardProps[];
  bulletinListRenderer?: (card: BulletinCardProps) => React.ReactElement;
}

const Index = (props: BulletinBoardProps) => {
  const { data, bulletinListRenderer = BulletinList } = props;

  const items: CollapseProps["items"] = data?.map((card: BulletinCardProps) => {
    return {
      ...card,
      children: <React.Fragment key={card.key}>{bulletinListRenderer(card)}</React.Fragment>,
    };
  });

  return (
    <Collapse
      className="bulletin-board-ekko"
      defaultActiveKey={data.map((item) => item.key)}
      ghost
      items={items}
      expandIconPosition="end"
    />
  );
};

export default Index;
