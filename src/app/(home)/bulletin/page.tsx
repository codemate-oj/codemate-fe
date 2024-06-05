import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "告示墙 - CODEMATE",
};

const BulletinPage = () => {
  return (
    <div>
      <PageTitle>告示墙</PageTitle>
    </div>
  );
};

export default BulletinPage;
