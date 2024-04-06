import React from "react";
import UnderlinedText from "./underlined-text";

interface IProps {
  hideLogo?: boolean;
}

const PageTitle: React.FC<React.PropsWithChildren<IProps>> = ({ hideLogo, children }) => {
  return (
    <div className="flex gap-x-4 text-xl leading-5 text-[#3D3D3D] py-8">
      {!hideLogo && <UnderlinedText>CODEMATE</UnderlinedText>}
      <h2>{children}</h2>
    </div>
  );
};

export default PageTitle;
