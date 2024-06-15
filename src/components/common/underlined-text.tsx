import React from "react";

const UnderlinedText: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative">
      <div className="relative z-[1] font-bold">{children}</div>
      <div className="absolute bottom-[2px] left-0 h-1 w-full bg-primary" />
    </div>
  );
};

export default UnderlinedText;
