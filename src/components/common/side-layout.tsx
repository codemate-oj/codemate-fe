import React from "react";

export interface SideLayoutProps {
  sideComponent?: React.ReactNode;
}

const SideLayout: React.FC<React.PropsWithChildren<SideLayoutProps>> = ({ sideComponent, children }) => {
  return (
    <div className="flex w-full space-x-[25px]">
      <div className="max-w-[950px] flex-1">{children}</div>
      {sideComponent && <div className="w-[225px] overflow-hidden">{sideComponent}</div>}
    </div>
  );
};

export default SideLayout;
