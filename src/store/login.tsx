"use client";

import { store } from "@davstack/store";
import { request } from "@/lib/request";
import LoginForm from "@/components/login/pages/login-form";
import EmailOrPhoneForm from "@/components/login/pages/email-or-phone-form";
import ChooseVerifyForm from "@/components/login/pages/choose-verify-form";
import UserInfoForm from "@/components/login/pages/user-info-form";

export type DialogStatusName = "login" | "choose-verify" | "input-email-or-phone" | "user-info";

export interface DialogPage {
  component: React.ReactNode;
  hideLogo?: boolean;
}

export interface DialogPageContext extends DialogPage {
  pageName: DialogStatusName;
  [key: string]: any;
}

export const DialogStatusMap: Record<DialogStatusName, DialogPage> = {
  login: {
    component: <LoginForm />,
  },
  "choose-verify": {
    component: <ChooseVerifyForm />,
  },
  "input-email-or-phone": {
    component: <EmailOrPhoneForm />,
  },
  "user-info": {
    component: <UserInfoForm />,
    hideLogo: true,
  },
};

const loginStore = store(
  {
    user: null as Hydro.UserContext | null,
    lastSendCode: null as Date | null,
    isDialogShow: false,
    dialogContextStack: [] as DialogPageContext[],
  },
  {
    name: "login",
    // 支持使用 redux devtools 调试
    devtools: {
      enabled: true,
      name: "login-store",
      store: "login",
      anonymousActionType: "update",
    },
    persist: {
      enabled: true,
      name: "login-store",
      partialize(state) {
        // 持久化记忆只能记忆user状态，否则会出问题
        return { ...state, isDialogShow: false, dialogContextStack: [] };
      },
    },
  }
).extend((store) => ({
  login: async (uname: string, password: string) => {
    await request.post("/login", { uname, password });
    // FIXME: 当前后端不能在登陆时更新UserContext 需要重复请求
    // @ts-ignore
    const { data } = await request.get("/login");
    // 登录失败：访客 _id=0 也算失败
    if (!data || !data.UserContext || data.UserContext._id === 0) {
      store.user.assign(null);
      throw new Error("登录请求失败");
    }
    if (store.user.get() === null) store.user.set(data.UserContext);
    else store.user.assign(data.UserContext);
    store.isDialogShow.set(false);
    store.dialogContextStack.set([]);
  },
  logout: async () => {
    await request.post("/logout");
    store.user.assign(null);
  },
  dialogJumpTo: (pageName: DialogStatusName, additionalContext?: Partial<Omit<DialogPageContext, "pageName">>) => {
    const ctx: DialogPageContext = {
      pageName,
      ...DialogStatusMap[pageName],
      ...(additionalContext ?? {}),
    };
    store.set((draft) => {
      draft.dialogContextStack.push(ctx);
    });
  },
  dialogGoBack: () => {
    if (store.dialogContextStack.get().length <= 1) return;
    store.set((draft) => {
      draft.dialogContextStack.pop();
    });
  },
  dialogReset: () => {
    store.dialogContextStack.set([]);
  },
  useCurrentContext: () => {
    const stack = store.dialogContextStack.use();
    if (!stack.length) return null;
    return stack[stack.length - 1];
  },
  getPreviousContext: () => {
    const stack = store.dialogContextStack.get();
    if (stack.length <= 1) return null;
    return stack[stack.length - 2];
  },
}));

export default loginStore;
