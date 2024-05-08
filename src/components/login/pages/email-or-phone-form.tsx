"use client";

import React, { useState } from "react";
import { VERIFY_OPTIONS } from "../user-verify";
import { Checkbox } from "../../ui/checkbox";
import { cn } from "@/lib/utils";
import store from "@/store/login";
import EmailForm from "./email-form";
import PhoneForm from "./phone-form";
import { request } from "@/lib/request";

const sendCode = async (payload: string, type: "phone" | "mail") => {
  const _body =
    type === "phone"
      ? {
          phone: payload,
        }
      : {
          mail: payload,
        };
  // FIXME: 还没有添加该类型
  // @ts-ignore
  const { data } = await request.post("/register", _body);
  const _slices = data.url.split("/");
  return _slices[_slices.length - 1] ?? "";
};

const EmailOrPhoneForm = () => {
  const [agreed, setAgreed] = useState(false);
  const formContext = store.useCurrentContext();
  const isEmail = formContext?.category === VERIFY_OPTIONS.EMAIL;

  const handleSubmit = async (value: string) => {
    setAgreed(true);
    const token = await sendCode(value, isEmail ? "mail" : "phone");
    console.log(token);
    switch (formContext?.purpose) {
      case "register":
        store.dialogJumpTo("user-info", {
          sendTo: value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col">
      {isEmail ? (
        <EmailForm
          title={formContext?.title}
          description={formContext?.description}
          buttonText={formContext?.buttonText}
          onSubmit={handleSubmit}
        />
      ) : (
        <PhoneForm
          title={formContext?.title}
          description={formContext?.description}
          buttonText={formContext?.buttonText}
          onSubmit={handleSubmit}
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
