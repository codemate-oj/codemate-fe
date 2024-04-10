import { store } from "@davstack/store";
import { request } from "@/lib/request";
import LoginForm from "@/components/login/login-form";
import RegisterForm from "@/components/login/register-form";
import ForgetPasswordForm from "@/components/login/forget-password-form";

export type DialogStatusName = "login" | "register" | "forget-password";
// | "phone-login"
// | "input-email-register"
// | "input-email-reset"
// | "input-phone-register"
// | "input-phone-reset"
// | "verify-code"
// | "reset-password"
// | "user-info";

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
  register: {
    component: <RegisterForm />,
  },
  "forget-password": {
    component: <ForgetPasswordForm />,
  },
};

const loginStore = store(
  {
    user: null as HydroUserContext | null,
    isDialogShow: false,
    dialogContextStack: [] as DialogPageContext[],
  },
  {
    persist: {
      enabled: true,
      name: "login-store",
    },
  }
).extend((store) => ({
  login: async (uname: string, password: string) => {
    const { data } = await request.post("/login", { uname, password });
    if (data && data.UserContext) {
      if (store.user.get() === null) store.user.set(data.UserContext);
      else store.user.assign(data.UserContext);
      store.isDialogShow.set(false);
      store.dialogContextStack.set([]);
    } else {
      throw new Error("登录失败");
    }
  },
  logout: async () => {
    await request.post("/logout");
    store.user.assign(null);
  },
  dialogJumpTo: (pageName: DialogStatusName) => {
    const ctx: DialogPageContext = {
      pageName,
      ...DialogStatusMap[pageName],
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
  setContext: (key: string, value: any) => {
    const stack = store.dialogContextStack.get();
    if (!stack.length) return;
    store.set((draft) => {
      const cur = draft.dialogContextStack.pop();
      if (!cur) {
        throw new Error("You cannot set an empty dialog context");
      }
      cur[key] = value;
      draft.dialogContextStack.push(cur);
    });
  },
}));

export default loginStore;
