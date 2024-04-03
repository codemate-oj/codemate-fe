import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import UserLogin from "@/components/home/user-login";
import { cn } from "@/lib/utils";
import PageFooter from "@/components/home/page-footer";
import Navigation, { NavItemType } from "@/components/home/navigation";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CODEMATE",
  description: "新一代的AI驱动的OJ平台",
};

const mainRoutes: NavItemType[] = [
  {
    name: "告示墙(公告)",
    path: "/bulletin",
  },
  {
    name: "修炼场(题库)",
    path: "/",
  },
  {
    name: "竞技场",
    path: "/contest",
  },
  {
    name: "封神榜",
    path: "/ranking",
  },
  {
    name: "觉醒台",
    path: "/discuss",
  },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <body className={cn(inter.className)}>
        <AntdRegistry>
          <header className="flex items-center justify-between m-auto py-2 max-w-screen-xl px-10 xl:px-0">
            <section className="flex items-center gap-x-2.5">
              <Image src="/img/logo.png" alt="website-logo" width={80} height={80} />
              <h1 className="text-2xl font-bold">AI推题，高效有趣玩OJ</h1>
            </section>
            <Navigation routes={mainRoutes} />
            <UserLogin />
          </header>
          <main className="max-w-full">{children}</main>
          <PageFooter />
        </AntdRegistry>
      </body>
    </html>
  );
}
