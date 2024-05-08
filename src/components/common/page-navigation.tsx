"use client";

import React, { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navigation: FC<{ routes?: NavItemType[] }> = ({ routes = [] }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex-1" />
      <nav className="absolute left-1/2 -translate-x-1/2">
        <ul className="flex gap-x-5">
          {routes?.map((r) => (
            <li className="relative" key={r.href.toString()}>
              <Link
                className={cn("truncate overflow-clip whitespace-nowrap", {
                  "opacity-50 cursor-default": r.disabled,
                  "text-orange-500 font-bold": pathname === r.href,
                })}
                href={r.href}
              >
                {r.name}
              </Link>
              {pathname === r.href && (
                <span className="absolute left-1/2 -bottom-1 w-1/2 h-0.5 bg-orange-500 transform -translate-x-1/2" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
