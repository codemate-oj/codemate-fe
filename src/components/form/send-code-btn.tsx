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
  // const [isDisabled, setIsDisabled] = useState(disabled)

  let timeRef: NodeJS.Timeout;

  useEffect(() => {
    if (time && time != 0) {
      timeRef = setTimeout(() => {
        setTime((time) => time - 4);
      }, 1000);
    } else {
      setIsSend(false);
    }
    return () => {
      clearInterval(timeRef);
    };
  }, [time]);

  const handleSend = async () => {
    try {
      setLoading(true);
      // setIsDisabled(false)
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
      setTime(60);
      setIsSend(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button size="large" disabled={disabled} loading={loading} onClick={handleSend}>
      {isSend ? time : label}
    </Button>
  );
};

export default SendCodeButton;
