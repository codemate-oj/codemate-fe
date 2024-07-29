import type { NavItemWithIcon } from "@/components/user/user-popup";
import Image from "next/image";

export const mainRoutes: NavItemType[] = [
  { name: "告示墙(公告)", href: "/bulletin" },
  { name: "修炼场(题库)", href: "/" },
  { name: "竞技场(竞赛)", href: "/contest" },
  { name: "封神榜", href: "/ranking" },
  { name: "觉醒台(论坛)", href: "/discuss" },
];

export const userCenterRoutes: NavItemWithIcon[] = [
  {
    name: "我的训练",
    href: "/user/record",
    icon: <Image src="/svg/popup-train.svg" alt="my-record" width={20} height={20} />,
  },
  // 暂时隐藏我的题单
  // {
  //   name: "我的题单",
  //   href: "/user/plist",
  //   icon: <Image src="/svg/popup-list.svg" alt="my-plist" width={17} height={20} />,
  // },
  {
    name: "我的比赛",
    href: "/user/contest",
    icon: <Image src="/svg/popup-competition.svg" alt="my-contest" width={20} height={20} />,
  },
  {
    name: "个人设置",
    href: "/user/setting",
    icon: <Image src="/svg/popup-setting.svg" alt="my-setting" width={20} height={20} />,
  },
  {
    name: "我的账户",
    href: "/user/wallet",
    icon: <Image src="/svg/popup-account.svg" alt="my-account" width={20} height={22} />,
  },
];
