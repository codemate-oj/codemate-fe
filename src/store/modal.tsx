"use client";

import { store } from "@davstack/store";
import ActivateForm from "@/components/home/pages/activate-form";
import React from "react";
import ActivateSuccess from "@/components/home/pages/activate-success";
import ActivateError from "@/components/home/pages/activate-error";
import CustomerService from "@/components/home/pages/customer-service";
import ActivateQuestion from "@/components/home/pages/activate-question";
import ActivateQuestionPoint from "@/components/home/pages/activate-question-point";
import ActivateSuccessPoint from "@/components/home/pages/activate-success-point";

export type ModalStatusName =
  | "activate"
  | "activate-success"
  | "activate-success-point"
  | "activate-error"
  | "customer-service"
  | "activate-question-group"
  | "activate-question-point";

export interface ModalPage {
  component: React.ReactNode;
}

export interface ModalPageContext extends ModalPage {
  pageName: ModalStatusName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const ModalStatusMap: Record<ModalStatusName, ModalPage> = {
  activate: {
    component: <ActivateForm />,
  },
  "activate-success": {
    component: <ActivateSuccess />,
  },
  "activate-success-point": {
    component: <ActivateSuccessPoint />,
  },
  "activate-error": {
    component: <ActivateError />,
  },
  "customer-service": {
    component: <CustomerService />,
  },
  "activate-question-group": {
    component: <ActivateQuestion />,
  },
  "activate-question-point": {
    component: <ActivateQuestionPoint />,
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
