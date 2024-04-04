import type { DialogStatusName } from "@/components/login/user-login";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type LoginState = {
  isLogIn?: boolean;
  lastRegisterIdentifier?: string;
  lastStepName?: DialogStatusName;
};

type LoginAction = {
  setIsLogIn: (isLogIn: boolean) => void;
  setLastRegisterIdentifier: (identifier: string) => void;
  setLastStepName: (stepName: DialogStatusName) => void;
};

const initialState: LoginState = {
  isLogIn: false,
};

const useLoginStore = create<LoginState & LoginAction>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setIsLogIn: (isLogIn) => set({ isLogIn }),
        setLastRegisterIdentifier: (identifier) => set({ lastRegisterIdentifier: identifier }),
        setLastStepName: (stepName) => set({ lastStepName: stepName }),
      }),
      { name: "login-store" }
    )
  )
);

export default useLoginStore;
