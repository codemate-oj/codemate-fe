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
      <nav className="absolute left-1/2 ml-14 -translate-x-1/2">
        <ul className="flex gap-x-5">
          {routes?.map((r) => (
            <li className="relative" key={r.href.toString()}>
              <Link
                className={cn("overflow-clip truncate whitespace-nowrap", {
                  "cursor-default opacity-50": r.disabled,
                  "font-bold text-orange-500": pathname === r.href,
                })}
                href={r.href}
              >
                {r.name}
              </Link>
              {pathname === r.href && (
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-1/2 -translate-x-1/2 transform bg-orange-500" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
