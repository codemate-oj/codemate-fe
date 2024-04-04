"use client";

import React, { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import ReactDOM from "react-dom";

export interface HeadlessDialogProps {
  open: boolean;
  modal?: boolean;
  overlayClassName?: string;
  contentWrapperClassName?: string;
  content?: (handleClose: () => void) => React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const HeadlessDialog: React.FC<HeadlessDialogProps> = ({
  open,
  modal,
  overlayClassName,
  contentWrapperClassName,
  content,
  onOpenChange,
}) => {
  return (
    <DialogPrimitive.Root modal={modal} open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            overlayClassName
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            contentWrapperClassName
          )}
        >
          {content?.(() => onOpenChange?.(false))}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default HeadlessDialog;

type HeadlessDialogPropsWithoutOpen = Omit<HeadlessDialogProps, "open" | "onOpenChange">;

interface ContainerProps extends HeadlessDialogPropsWithoutOpen {
  unmountReact?: () => void;
  unmountDom?: () => void;
}

export const DialogContainer: React.FC<ContainerProps> = ({ unmountDom, unmountReact, ...props }) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (!isOpen) {
      unmountReact?.();
      setTimeout(() => {
        unmountDom?.();
      });
    }
  }, [isOpen]);
  return <HeadlessDialog {...props} open={isOpen} onOpenChange={setIsOpen} />;
};

export function showDialog(props: HeadlessDialogPropsWithoutOpen) {
  const div = document.createElement("div");
  div.style.display = "none";
  document.body.appendChild(div);
  // eslint-disable-next-line react/no-deprecated
  ReactDOM.render(<DialogContainer {...props} />, div);
}
