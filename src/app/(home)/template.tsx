"use client";
import React from "react";

const HomeTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default HomeTemplate;
