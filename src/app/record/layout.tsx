import PageFooter from "@/components/common/page-footer";
import React from "react";

const RecordLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="m-auto max-w-[1200px] py-10">{children}</div>
      <PageFooter />
    </>
  );
};

export default RecordLayout;
