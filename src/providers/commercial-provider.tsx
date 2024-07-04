"use client";
import React from "react";

export interface CommercialInfoType {
  hideHeader?: boolean;
  hideFooter?: boolean;
  setCommercialInfo: (commercialInfo: CommercialInfoType) => void;
}

export const CommercialContext = React.createContext<CommercialInfoType>({
  setCommercialInfo: () => {},
});

/**
 * 决定是否显示商业信息（页头和页脚）
 */
const CommercialProvider: React.FC<React.PropsWithChildren> = () => {
  const [commercialInfo, setCommercialInfo] = React.useState<Omit<CommercialInfoType, "setCommercialInfo">>({});
  return <CommercialContext.Provider value={{ ...commercialInfo, setCommercialInfo }}></CommercialContext.Provider>;
};

export default CommercialProvider;
