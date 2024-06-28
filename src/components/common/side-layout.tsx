import React from "react";

export interface SideLayoutProps {
  sideComponent?: React.ReactNode;
}

const SideLayout: React.FC<React.PropsWithChildren<SideLayoutProps>> = ({ sideComponent, children }) => {
  return (
    <div className="flex w-full space-x-6">
      <div className="flex-1">{children}</div>
      {sideComponent && (
        <div className="hidden overflow-hidden lg:block lg:w-[250px] xl:w-[300px]">{sideComponent}</div>
      )}
    </div>
  );
};

export default SideLayout;
