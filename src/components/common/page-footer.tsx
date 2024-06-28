import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SectionProps {
  icon: React.ReactNode;
  title: string;
}

export const FooterSection: React.FC<React.PropsWithChildren<SectionProps>> = ({ icon, title, children }) => (
  <section className="flex flex-col items-center">
    <div className="flex h-[40px] items-center">{icon}</div>
    <h4 className="mt-3 text-lg text-[#3D3D3D]">{title}</h4>
    <ul className="mt-5 grid grid-cols-2 gap-x-2 gap-y-3 text-center">{children}</ul>
  </section>
);

const PageFooter = () => {
  return (
    <footer className="w-full bg-[#F8F8F8] text-center text-[#797979]">
      <div className="m-auto flex max-w-screen-2xl justify-center gap-14 p-10">
        <section className="text-center">
          <Image src="/img/logo.png" alt="website-logo" width={178} height={178} />
          <p className="mt-5 text-xl text-[#3D3D3D]">AI推题，高效有趣玩OJ</p>
        </section>
        <FooterSection
          icon={<Image src="/svg/footer-user-service.svg" alt="user-service" width={26} height={34} />}
          title="用户服务"
        >
          <li>常见问题</li>
          <li className="text-[#FF7D37]">玩法攻略</li>
          <li className="col-span-2">客服支持：QQ 3768378029</li>
          <li className="col-span-2">分享交流：QQ群 647085384</li>
        </FooterSection>
        <FooterSection
          icon={<Image src="/svg/footer-cooperation.svg" alt="cooperation" width={42} height={34} />}
          title="商务合作"
        >
          <li className="col-span-2">赛事平台委托评测</li>
          <li className="col-span-2">中小学OJ平台定制</li>
          <li className="col-span-2">教培机构OJ共享服务</li>
          <li className="col-span-2">合作热线：400-850-8565</li>
        </FooterSection>
        <FooterSection
          icon={<Image src="/svg/footer-rules.svg" alt="rules" width={30} height={34} />}
          title="觉醒台规则"
        >
          <li className="col-span-2">哪些行为一定不能做？</li>
          <li>
            <Link href={`/privacy`}>隐私协议</Link>
          </li>
          <li>奖惩协议</li>
          <li>投诉建议</li>
        </FooterSection>
        <FooterSection
          icon={<Image src="/svg/footer-about.svg" alt="about-us" width={30} height={34} />}
          title="关于CODEMATE"
        >
          <li>品牌故事</li>
          <li>平台优势</li>
          <li>联系我们</li>
          <li>加入我们</li>
        </FooterSection>
        <FooterSection
          icon={<Image src="/svg/footer-recruit.svg" alt="recruiting" width={30} height={34} />}
          title="人才招募"
        >
          <li>志愿者</li>
          <li>命题者</li>
          <li>管理员</li>
          <li>加入我们</li>
        </FooterSection>
      </div>
      <aside className="bg-[#ECECEC] py-3">
        <ul className="m-auto flex max-w-screen-2xl justify-end gap-4">
          <li>故障反馈</li>
          <li>用户条款</li>
          <li>
            <Link href="/record" target="_blank">
              评测队列
            </Link>
          </li>
          <li>
            <a href="https://api.aioj.net/status" target="_blank">
              服务状态
            </a>
          </li>
          {process.env.NEXT_PUBLIC_BEIAN && (
            <li>
              <a href="https://beian.miit.gov.cn/" target="_blank">
                {process.env.NEXT_PUBLIC_BEIAN}
              </a>
            </li>
          )}
          <li>
            <span>Powered By </span>
            <a href="https://github.com/hydro-dev/Hydro" target="_blank">
              Hydro
            </a>
          </li>
        </ul>
      </aside>
    </footer>
  );
};

export default PageFooter;
