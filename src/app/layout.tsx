import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

import PageFooter from "@/components/common/page-footer";
import Navigation from "@/components/common/page-navigation";
import UserLogin from "@/components/login/user-login";
import { cn } from "@/lib/utils";

import { mainRoutes } from "@/constants/routes";
import { LoginStoreProvider } from "@/providers/login-store-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={cn(inter.className)}>
        <AntdRegistry>
          <LoginStoreProvider>
            <header className="flex items-center justify-between m-auto py-2 max-w-screen-xl px-10 xl:px-0">
              <section className="flex items-center gap-x-2.5">
                <Image src="/img/logo.png" alt="website-logo" width={80} height={80} />
                <h1 className="text-2xl font-bold hidden lg:block">AI推题，高效有趣玩OJ</h1>
              </section>
              <Navigation routes={mainRoutes} />
              <UserLogin />
            </header>
            <main className="max-w-full">{children}</main>
          </LoginStoreProvider>
          <PageFooter />
        </AntdRegistry>
      </body>
    </html>
  );
}
