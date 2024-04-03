import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface LinkItem {
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
      <h3 className=" text-base font-bold text-center">{displayName}</h3>
      <div className="grid grid-cols-3 gap-y-20 gap-x-37">
        {links?.map((l) => (
          <Link key={l.name} href={l.href}>
            {l.icon}
            <span>{l.name}</span>
          </Link>
        ))}
      </div>
      <div className="w-full text-center">
        <Button variant="link" onClick={onLogout}>
          退出登录
        </Button>
      </div>
    </aside>
  );
};

export default UserPopup;
