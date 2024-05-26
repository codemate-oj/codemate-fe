import PageFooter from "@/components/common/page-footer";
import React from "react";

const ProblemDetailLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <PageFooter />
    </>
  );
};

export default ProblemDetailLayout;
