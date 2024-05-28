"use client";
import React, { useState, useEffect } from "react";

const CountdownTimer: React.FC<{ time: number }> = ({ time }) => {
  const [countdown, setCountdown] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}天${hours}小时${minutes}分钟${remainingSeconds}秒`;
  };

  return (
    <div>
      报名倒计时：<span className="text-[#FF7D37] font-bold">{formatTime(countdown)}</span>
    </div>
  );
};

export default CountdownTimer;
