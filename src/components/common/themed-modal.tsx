import { type DialogProps } from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export interface ModalProps extends DialogProps {
  titleIcon?: ReactNode;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}

const ThemedModal: React.FC<ModalProps> = ({ titleIcon, title, children, footer, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="w-fit border-none p-0">
        <div className="flex min-h-[335px] w-[464px] flex-col">
          <div className="flex w-full gap-4 rounded-t-lg bg-[#FF7D37] pb-2 pl-6 pt-6 text-3xl text-white">
            {titleIcon}
            {title}
          </div>
          <div className="mx-6 my-4 flex flex-1 flex-col">
            <div className="flex-1 px-4 py-2">{children}</div>
            {footer && <div className="m-auto my-5">{footer}</div>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemedModal;
