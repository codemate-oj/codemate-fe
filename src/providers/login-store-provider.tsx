"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type LoginStore, createLoginStore } from "@/store/login";

export const LoginStoreContext = createContext<StoreApi<LoginStore> | null>(null);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export const LoginStoreProvider = ({ children }: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<LoginStore>>();
  if (!storeRef.current) {
    storeRef.current = createLoginStore();
  }

  return <LoginStoreContext.Provider value={storeRef.current}>{children}</LoginStoreContext.Provider>;
};

export const useLoginStore = <T,>(selector: (store: LoginStore) => T): T => {
  const counterStoreContext = useContext(LoginStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
