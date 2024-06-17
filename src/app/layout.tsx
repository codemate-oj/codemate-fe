/* eslint-disable @next/next/no-sync-scripts */
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

import Navigation from "@/components/common/page-navigation";
import { cn } from "@/lib/utils";

import { mainRoutes } from "@/constants/routes";
import AntdThemeConfigProvider from "@/providers/antd-theme-config-provider";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import NiceModalProvider from "@/providers/nice-modal-provider";
import ApolloContextProvider from "@/providers/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

const UserLogin = dynamic(() => import("@/components/login/user-login"), {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  title: "CODEMATE",
  description: "新一代的AI驱动的OJ平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <head>
        <script src="https://turing.captcha.qcloud.com/TCaptcha.js"></script>
      </head>
      <body className={cn(inter.className)}>
        <ApolloContextProvider>
          <AntdRegistry>
            <AntdThemeConfigProvider>
              <NiceModalProvider>
                <header className="relative m-auto flex max-w-screen-xl items-center justify-between px-10 py-2 xl:px-0">
                  <section className="flex flex-none items-center gap-x-2.5">
                    <Image src="/img/logo.png" alt="website-logo" width={80} height={80} />
                    <h1 className="hidden text-2xl font-bold lg:block">AI推题，高效有趣玩OJ</h1>
                  </section>
                  <Navigation routes={mainRoutes} />
                  <div className="flex-none">
                    <UserLogin />
                  </div>
                </header>
                <main className="max-w-full">{children}</main>
                <Toaster richColors />
              </NiceModalProvider>
            </AntdThemeConfigProvider>
          </AntdRegistry>
        </ApolloContextProvider>
      </body>
    </html>
  );
}
