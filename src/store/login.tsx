"use client";

import { store } from "@davstack/store";
import { request } from "@/lib/request";
import LoginForm from "@/components/login/pages/login-form";
import EmailOrPhoneForm from "@/components/login/pages/email-or-phone-form";
import ChooseVerifyForm from "@/components/login/pages/choose-verify-form";
import UserInfoForm from "@/components/login/pages/user-info-form";
import { toast } from "sonner";
import { headers } from "next/headers";

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
    sid: null as string | null,
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
  /**
   * 无感刷新登录状态
   */
  renew: async () => {
    const sid = store.sid.get();
    if (!sid) return;
    //@ts-ignore
    const { data } = await request.get(`/login?sid=${sid}`, {
      headers: {
        Authorization: `Bearer ${sid}`,
      },
      transformData: (data, headers) => {
        return { sid: headers.get("X-Hydro-Sid") as string | null, ...data };
      },
    });
    if (!data || !data.UserContext || data.UserContext._id === 0) {
      if (store.user.get()) {
        // 若此前已登录，则提示失效
        toast.warning("登录已失效，请重新登录");
      }
      store.user.set(null);
      store.sid.set(null);
    } else {
      store.user.set(data.UserContext);
      store.sid.set(data.sid);
    }
  },
  login: async (uname: string, password: string) => {
    const sid = await request.post(
      "/login",
      { uname, password },
      {
        transformData: (data, headers) => {
          return ((data as any).sid ?? headers.get("X-Hydro-Sid")) as string | null;
        },
      }
    );
    store.sid.set(sid);
    store.isDialogShow.set(false);
    store.dialogContextStack.set([]);
    // 登陆成功后刷新整个页面
    window.location.reload();
  },
  logout: async () => {
    await request.post("/logout");
    store.user.assign(null);
    window.location.reload();
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
