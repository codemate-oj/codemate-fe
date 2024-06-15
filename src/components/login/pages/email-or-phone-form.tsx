"use client";

import React, { useState } from "react";
import { VERIFY_OPTIONS } from "../user-verify";
import { Checkbox } from "../../ui/checkbox";
import { cn } from "@/lib/utils";
import store from "@/store/login";
import EmailForm from "./email-form";
import PhoneForm from "./phone-form";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";

const EmailOrPhoneForm = () => {
  const [agreed, setAgreed] = useState(false);
  const formContext = store.useCurrentContext();
  const isEmail = formContext?.category === VERIFY_OPTIONS.EMAIL;

  const { runAsync: handleSubmit, loading } = useRequest(
    async (value: string, ticket: string, randStr: string) => {
      setAgreed(true);
      let token: string;
      if (isEmail) {
        token = await request.post(
          "/register/email-code",
          {
            mail: value,
            ticket,
            randStr,
          },
          {
            transformData: ({ data }) => data.tokenId,
          }
        );
      } else {
        token = await request.post(
          "/register/sms-code",
          {
            phoneNumber: value,
            ticket,
            randStr,
          },
          {
            transformData: ({ data }) => data.tokenId,
          }
        );
      }
      switch (formContext?.purpose) {
        case "register":
          store.dialogJumpTo("user-info", {
            sendTo: value,
            token,
          });
          break;
        default:
          break;
      }
    },
    {
      manual: true,
    }
  );
  return (
    <div className="flex flex-col">
      {isEmail ? (
        <EmailForm
          title={formContext?.title}
          description={formContext?.description}
          buttonText={formContext?.buttonText}
          onSubmit={handleSubmit}
          loading={loading}
        />
      ) : (
        <PhoneForm
          title={formContext?.title}
          description={formContext?.description}
          buttonText={formContext?.buttonText}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}

      {formContext?.agreements && formContext.agreements.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <Checkbox id="agreement" checked={agreed} onClick={() => setAgreed(!agreed)} />
          <label htmlFor="agreement">
            我已阅读并同意
            {formContext.agreements.map((item: AgreementType) => (
              <a href={item.href} target="_blank" key={item.href} className={cn("text-[#FF7D37]", item.className)}>
                《{item.title}》
              </a>
            ))}
          </label>
        </div>
      )}
    </div>
  );
};

export default EmailOrPhoneForm;
