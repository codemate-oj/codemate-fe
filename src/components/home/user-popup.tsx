import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export interface LinkItem {
  icon?: React.ReactNode;
  name: string;
  href: Parameters<typeof Link>[0]["href"];
}

interface IProps {
  displayName?: string;
  links?: LinkItem[];
  onLogout?: () => void;
}

const UserPopup: React.FC<IProps> = ({ displayName = "user", links, onLogout }) => {
  return (
    <aside>
      <h3 className="text-base font-bold text-center my-5">{displayName}</h3>
      <div className="grid grid-cols-3 gap-y-5 gap-x-8 px-[34px]">
        {links?.map((l) => (
          <Link className="flex flex-col items-center gap-y-[5px]" key={l.name} href={l.href}>
            <div>{l.icon}</div>
            <div className="text-xs">{l.name}</div>
          </Link>
        ))}
      </div>
      <div className="w-full text-center mt-9 border-t border-gray-200">
        <Button variant="link" onClick={onLogout}>
          退出登录
        </Button>
      </div>
    </aside>
  );
};

export default UserPopup;
