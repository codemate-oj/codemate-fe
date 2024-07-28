"use client";

import { ConfigProvider, ConfigProviderProps } from "antd";
import React from "react";

type AntdThemeProviderProps = ConfigProviderProps["theme"];

export const antdCustomTheme: AntdThemeProviderProps = {
  token: {
    colorPrimary: "#FF7D37",
    colorPrimaryBorder: "#FFFFFF",
    colorLink: "unset",
  },
  components: {
    Button: {
      defaultActiveColor: "#FF7D37",
    },
    Tabs: {
      inkBarColor: "#FF7D37",
      itemActiveColor: "#FF7D37",
      itemHoverColor: "#FF7D37",
      itemSelectedColor: "#FF7D37",
    },
    Table: {
      headerColor: "#797979",
      cellFontSize: 14,
      rowExpandedBg: "white",
      borderColor: "white",
      colorText: "#3D3D3D",
    },
    Form: {
      labelColor: "#797979",
    },
    Progress: {
      defaultColor: "#FF7D37",
    },
    Input: {
      activeBorderColor: "#FF7D37",
      hoverBorderColor: "#FF7D37",
    },
    Tag: {
      defaultBg: "red",
    },
    Breadcrumb: {
      lastItemColor: "#FF7D37",
    },
  },
};

const AntdThemeConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ConfigProvider theme={antdCustomTheme}>{children}</ConfigProvider>;
};

export default AntdThemeConfigProvider;
