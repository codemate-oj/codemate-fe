"use client";

import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import store, { ModalPageContext } from "@/store/modal";
import { useUpdateEffect } from "ahooks";

const CommonModal: React.FC = () => {
  const isModalShow = store.isModalShow.use();
  const currentContext = store.currentContext.use();

  const handleOpenChange = (open: boolean) => {
    store.isModalShow.set(open);
    if (!open) {
      store.currentContext.set({} as ModalPageContext);
    }
  };

  useUpdateEffect(() => {
    handleOpenChange(isModalShow);
  }, [isModalShow]);

  return (
    <Dialog open={isModalShow} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[500px] border-0 p-0">{currentContext?.component}</DialogContent>
    </Dialog>
  );
};

export default CommonModal;
