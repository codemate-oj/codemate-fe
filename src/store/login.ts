import type { DialogStatusName } from "@/components/login/user-login";
import { createStore } from "zustand/vanilla";
import { devtools, persist } from "zustand/middleware";

export type LoginState = {
  isLogIn?: boolean;
  lastRegisterIdentifier?: string;
  lastStepName?: DialogStatusName;
};

export type LoginAction = {
  setIsLogIn: (isLogIn: boolean) => void;
  setLastRegisterIdentifier: (identifier: string) => void;
  setLastStepName: (stepName: DialogStatusName) => void;
};

export type LoginStore = LoginState & LoginAction;

const initialLoginState: LoginState = {
  isLogIn: false,
};

export const createLoginStore = (initState = initialLoginState) => {
  return createStore<LoginStore>()(
    devtools((set) => ({
      ...initState,
      setIsLogIn: (isLogIn) => set({ isLogIn }),
      setLastRegisterIdentifier: (identifier) => set({ lastRegisterIdentifier: identifier }),
      setLastStepName: (stepName) => set({ lastStepName: stepName }),
    }))
  );
};
