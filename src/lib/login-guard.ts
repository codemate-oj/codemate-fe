"use client";

import loginStore from "@/store/login";
import { HydroError, NotLoginError } from "./error";
import { toast } from "sonner";

export async function loginGuard(fn: () => unknown | Promise<unknown>, msg?: string, catchHydroError = true) {
  try {
    const user = loginStore.user.get();
    if (!user) throw new NotLoginError(msg, window.location.href);
    await fn();
  } catch (e) {
    if (e instanceof NotLoginError) {
      toast.error(e.msgCn ?? msg ?? "您尚未登录");
      loginStore.showLoginDialog();
    } else if (catchHydroError && e instanceof HydroError) {
      toast.error(e.message);
    } else {
      throw e;
    }
  }
}
