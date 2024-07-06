import React, { FC, useState, useEffect } from "react";
import { Button } from "antd";
import { request } from "@/lib/request";

export interface ButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  addressDescription?: boolean;
  phone: string;
  wrapperClassName?: string;
  ticket: string;
  randStr: string;
  disabled?: boolean;
  onSuccess: (tokenId: string) => void;
}

const SendCodeButton: FC<ButtonProps> = ({ phone, label, ticket, randStr, disabled, onSuccess }) => {
  const [isSend, setIsSend] = useState(false);
  const [time, setTime] = useState(60);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(disabled);
  let timeRef: NodeJS.Timeout;

  useEffect(() => {
    setIsDisabled(disabled);
    if (isSend) {
      if (time && time != 0) {
        setIsDisabled(true);
        timeRef = setTimeout(() => {
          setTime((time) => time - 1);
        }, 1000);
      } else {
        setIsSend(false);
        setIsDisabled(false);
      }
    }

    return () => {
      clearInterval(timeRef);
    };
  }, [time, disabled, isSend]);

  const handleSend = async () => {
    try {
      setLoading(true);
      const dataTokenId = await request.post(
        "/login/sms-code",
        {
          uname: phone,
          ticket,
          randStr,
        },
        {
          transformData: ({ data }) => data.tokenId,
        }
      );
      onSuccess(dataTokenId);
      setLoading(false);
      setIsSend(true);
      setTime(60);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button size="large" disabled={isDisabled} loading={loading} onClick={handleSend}>
      {isSend ? time : label}
    </Button>
  );
};

export default SendCodeButton;
