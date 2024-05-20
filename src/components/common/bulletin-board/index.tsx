import { Button, Collapse } from "antd";
import Link from "next/link";
import Image from "next/image";
import React, { ComponentProps, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import type { CollapseProps } from "antd";
import "./styles.css";

interface BullltinItemProps {
  text: string;
  date: string;
  time: string;
  href: NavItemType["href"];
}

const BulletinItem = (props: BullltinItemProps) => {
  const { text, date, time, href } = props;
  return (
    <>
      <Link className="text-gray-900" href={href}>
        {text}
      </Link>
      <div className="flex flex-col text-[#B9B9B9] text-sm mt-[54px]">
        <span>{date}</span>
        <span>{time}</span>
      </div>
    </>
  );
};

interface BulletinCardProps {
  key: string;
  label: string;
  children: BullltinItemProps[];
}

const BulletinList = ({ children }: BulletinCardProps) => {
  return (
    <>
      {children.map((child) => (
        <BulletinItem key={child.text} {...child}></BulletinItem>
      ))}
    </>
  );
};

interface BulletinBoardProps {
  data: BulletinCardProps[];
  bulletinListRenderer?: (card: BulletinCardProps) => React.ReactElement;
}

const Index = (props: BulletinBoardProps) => {
  const { data, bulletinListRenderer } = props;

  const items: CollapseProps["items"] = data?.map((card: BulletinCardProps) => {
    return {
      ...card,
      children: bulletinListRenderer ? (
        bulletinListRenderer(card)
      ) : (
        <BulletinList {...card} key={card.key}></BulletinList>
      ),
    };
  });

  return <Collapse defaultActiveKey={["1"]} ghost items={items} expandIconPosition="end" />;
};

export default Index;
