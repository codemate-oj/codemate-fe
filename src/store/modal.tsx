"use client";

import { store } from "@davstack/store";
import ActivateForm from "@/components/home/pages/activate-form";
import React from "react";
import ActivateSuccess from "@/components/home/pages/activate-success";
import ActivateError from "@/components/home/pages/activate-error";
import CustomerService from "@/components/home/pages/customer-service";
import ActivateQuestion from "@/components/home/pages/activate-question";

export type ModalStatusName =
  | "activate"
  | "activate-success"
  | "activate-error"
  | "customer-service"
  | "activate-question";

export interface ModalPage {
  component: React.ReactNode;
}

export interface ModalPageContext extends ModalPage {
  pageName: ModalStatusName;

  [key: string]: any;
}

export const ModalStatusMap: Record<ModalStatusName, ModalPage> = {
  activate: {
    component: <ActivateForm />,
  },
  "activate-success": {
    component: <ActivateSuccess />,
  },
  "activate-error": {
    component: <ActivateError />,
  },
  "customer-service": {
    component: <CustomerService />,
  },
  "activate-question": {
    component: <ActivateQuestion />,
  },
};

const ModalStore = store(
  {
    isModalShow: false,
    currentContext: {} as ModalPageContext,
  },
  {
    name: "modal",
    // 支持使用 redux devtools 调试
    devtools: {
      enabled: true,
      name: "modal-store",
      store: "modal",
      anonymousActionType: "update",
    },
  }
).extend((store) => ({
  modalJumpTo: (pageName: ModalStatusName, additionalContext?: Partial<Omit<ModalPageContext, "pageName">>) => {
    const ctx: ModalPageContext = {
      pageName,
      ...ModalStatusMap[pageName],
      ...(additionalContext ?? {}),
    };
    store.set((draft) => {
      draft.currentContext = ctx;
    });
  },
}));

export default ModalStore;
