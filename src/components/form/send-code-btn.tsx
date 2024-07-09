import React, { FC, useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import { HydroError } from "@/lib/error";

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
  error: (e: string) => void;
}

const SendCodeButton: FC<ButtonProps> = ({ phone, label, ticket, randStr, disabled, onSuccess, error }) => {
  const [isSend, setIsSend] = useState(false);
  const [time, setTime] = useState(60);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsDisabled(disabled);
    if (isSend) {
      if (time && time != 0) {
        setIsDisabled(true);
        timeRef.current = setTimeout(() => {
          setTime((time) => time - 1);
        }, 1000);
      } else {
        setIsSend(false);
        setIsDisabled(false);
      }
    }
    return () => {
      clearInterval(timeRef.current!);
    };
  }, [time, disabled, isSend]);

  const { runAsync: handleSubmit, loading } = useRequest(
    async () => {
      try {
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
        setIsSend(true);
        setTime(60);
      } catch (e) {
        console.error(e);
        if (e instanceof HydroError) {
          error(e.message);
        } else {
          throw e;
        }
      }
    },
    {
      manual: true,
    }
  );
  return (
    <Button size="large" disabled={isDisabled} loading={loading} onClick={handleSubmit}>
      {isSend ? time : label}
    </Button>
  );
};

export default SendCodeButton;
