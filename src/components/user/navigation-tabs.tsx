"use client";
import { userCenterRoutes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import SquareSideTabs from "../common/square-side-tabs";

const NavigationTabs = () => {
  const pathname = usePathname();

  const navItems = useMemo<NavItemType[]>(() => {
    return userCenterRoutes?.map((r) => ({ ...r, isActive: pathname.startsWith(r.href) }));
  }, [pathname]);

  return <SquareSideTabs items={navItems} />;
};

export default NavigationTabs;
