import React from "react";

interface IProps {
  hideLogo?: boolean;
}

const PageTitle: React.FC<React.PropsWithChildren<IProps>> = ({ hideLogo, children }) => {
  return (
    <div className="flex gap-x-4 text-xl leading-5 text-[#3D3D3D] py-8">
      {!hideLogo && (
        <div className="relative">
          <div className="relative font-bold z-10">CODEMATE</div>
          <div className="absolute bottom-[2px] left-0 w-full h-1 bg-primary" />
        </div>
      )}
      <h2>{children}</h2>
    </div>
  );
};

export default PageTitle;
