"use client";
import React from "react";
import { Button, ConfigProvider } from "antd";
import styles from "./Overview.module.css";
import Image from "next/image";
import { showRechargeModal } from "@/components/user/account/recharge-modal";
import ShowRecahrgeCardModal from "@/components/user/account/recharge-card-modal";
import ShowRecahrgeCardOtherModal from "@/components/user/account/recharge-card-other-modal";
import NiceModal from "@ebay/nice-modal-react";

interface CardProps {
  className?: string;
  title: string;
  icon?: React.ReactNode;
  buttonText: string;
  buttonColor?: string;
  onClickButton?: () => void;
}

const Card: React.FC<CardProps> = ({ className, title, icon, buttonText, buttonColor = "#FF7D37", onClickButton }) => {
  return (
    <div className={`${styles.balanceAddCard} ${className}`}>
      <div className={styles.leftIconBg}>{icon}</div>
      <div className={styles.rightText}>
        <div className={styles.rightTitle}>{title}</div>
        <ConfigProvider theme={{ token: { colorPrimary: buttonColor } }}>
          <Button type="primary" onClick={onClickButton} style={{ lineHeight: 0, padding: "10px 50px" }}>
            {buttonText}
          </Button>
        </ConfigProvider>
      </div>
    </div>
  );
};

const showAntdModal = () => {
  // Show a modal with arguments passed to the component as props
  NiceModal.show(showRechargeModal);
};

const CardContent: Parameters<typeof Card>[0][] = [
  {
    title: "充值卡充值",
    buttonText: "立即充值",
    buttonColor: "#2D7AB3",
    className: `${styles.aqua}`,
    icon: <Image src="/svg/card-recharge-icon.svg" alt="about-us" width={100} height={100} />,
    onClickButton: () => {
      NiceModal.show(ShowRecahrgeCardModal);
    },
  },
  {
    title: "给别人充值",
    buttonText: "代充值",
    className: `${styles.orange} ${styles.forOthers}`,
    icon: <Image src="/svg/recharge-for-others.svg" alt="about-us" width={100} height={100} />,
    onClickButton: () => {
      NiceModal.show(ShowRecahrgeCardOtherModal);
    },
  },
];

const Overview = () => {
  return (
    <div>
      <div className={styles.balanceBanner}>
        <div className={styles.leftIcon}>
          <Image src="/svg/account-wallet.svg" alt="about-us" width={30} height={34} />
        </div>
        <div className={styles.balanceMain}>
          <div className={styles.balanceTitle}>魅值余额</div>
          <div className={styles.balanceValue}>
            <span className={styles.balanceNumber}>0</span>
            <span className={styles.balanceUnit}>点</span>
          </div>
        </div>
        <div>
          <Button type="primary" style={{ padding: "10px 50px", lineHeight: 0 }} onClick={showAntdModal}>
            充值
          </Button>
        </div>
      </div>

      <div className={styles.balanceOtherCards}>
        {CardContent.map((item) => (
          <Card {...item} key={item.title} />
        ))}
      </div>
    </div>
  );
};

export default Overview;
