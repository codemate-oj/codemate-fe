"use client";

import PageTitle from "@/components/common/page-title";
import { mainRoutes } from "@/constants/routes";
import { usePathname } from "next/navigation";
import React from "react";

const HomeTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <>
      <PageTitle>{mainRoutes.find((r) => r.href === pathname)?.name}</PageTitle>
      {children}
    </>
  );
};

export default HomeTemplate;
