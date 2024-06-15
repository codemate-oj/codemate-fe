import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export interface NavItemWithIcon extends NavItemType {
  icon?: React.ReactNode;
}

interface IProps {
  displayName?: string;
  links?: NavItemWithIcon[];
  onLogout?: () => void;
}

const UserPopup: React.FC<IProps> = ({ displayName = "user", links, onLogout }) => {
  return (
    <aside>
      <h3 className="my-5 text-center text-base font-bold">{displayName}</h3>
      <div className="grid grid-cols-3 gap-x-8 gap-y-5 px-[34px]">
        {links?.map((l) => (
          <Link className="flex flex-col items-center gap-y-[5px]" key={l.name} href={l.href}>
            <div>{l.icon}</div>
            <div className="text-xs">{l.name}</div>
          </Link>
        ))}
      </div>
      <div className="mt-9 w-full border-t border-gray-200 text-center">
        <Button variant="link" onClick={onLogout}>
          退出登录
        </Button>
      </div>
    </aside>
  );
};

export default UserPopup;
