"use client";

import React, { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export interface NavItemType {
  name: string;
  path: Parameters<typeof Link>[0]["href"];
  disabled?: boolean;
}

const Navigation: FC<{ routes?: NavItemType[] }> = ({ routes = [] }) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-x-5">
        {routes.map((r) => (
          <li className="relative" key={r.path.toString()}>
            <Link
              className={cn({
                "opacity-50 cursor-default": r.disabled,
                "text-orange-500 font-bold": pathname === r.path,
              })}
              href={r.path}
            >
              {r.name}
            </Link>
            {pathname === r.path && (
              <span className="absolute left-1/2 -bottom-1 w-1/2 h-0.5 bg-orange-500 transform -translate-x-1/2" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
