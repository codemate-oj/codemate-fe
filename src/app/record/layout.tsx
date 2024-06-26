import PageFooter from "@/components/common/page-footer";
import React from "react";

const RecordLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="m-auto max-w-[1200px] px-5 py-10 xl:px-0">{children}</div>
      <PageFooter />
    </>
  );
};

export default RecordLayout;
