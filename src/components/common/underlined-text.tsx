import React from "react";

const UnderlinedText: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative">
      <div className="relative font-bold z-10">{children}</div>
      <div className="absolute bottom-[2px] left-0 w-full h-1 bg-primary" />
    </div>
  );
};

export default UnderlinedText;
