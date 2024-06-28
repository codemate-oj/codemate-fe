"use client";
import { request } from "@/lib/request";
import { Modal } from "antd";
import { CheckOutlined, ExportOutlined } from "@ant-design/icons";
import CountdownTimer from "./count-down";
import { useState } from "react";
import store from "@/store/login";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginRegisterModal from "@/components/login/login-register-modal";

const handleClickApply = async (tid: string, setIsOpen: () => void) => {
  await request.post(`/contest/${tid as "{tid}"}`, { operation: "attend" });
  setIsOpen();
  return 0;
};
const DetailStateApply: React.FC<{
  isLogin: boolean;
  isApply: boolean;
  state: string;
  tid: string;
  click: () => void;
}> = (props) => {
  const { isLogin, isApply, state, tid, click } = props;
  if (isApply) {
    if (state == "进行中") {
      return (
        <Link
          href={`/contest/${tid}/problems`}
          target="_blankss"
          className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white"
        >
          开始做题
        </Link>
      );
    } else if (state == "已结束") {
      return (
        <Link
          href={`/contest/${tid}/problems`}
          target="_blankss"
          className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white"
        >
          查看结果
        </Link>
      );
    } else {
      return (
        <span className="cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white">
          已报名
        </span>
      );
    }
  } else {
    if (state == "预告中") {
      return <></>;
    } else if (state == "可报名" || state == "进行中") {
      return (
        <span
          className="cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white"
          onClick={() => {
            if (!isLogin) {
              store.dialogJumpTo("login");
              return;
            }
            handleClickApply(tid, () => {
              click();
            });
          }}
        >
          马上报名
        </span>
      );
    } else {
      return (
        <span className="cursor-not-allowed rounded-lg border border-[#706f6e] bg-[#706f6e] px-4 py-2 text-sm font-normal text-white">
          报名已结束
        </span>
      );
    }
  }
};
const ContestDetailFooter: React.FC<{
  title: string;
  isApply: boolean;
  state: string;
  tid: string;
  checkinEndAt?: string;
}> = (props) => {
  const { isApply, state, tid, checkinEndAt, title } = props;

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    store.isDialogShow.set(open);
    if (!open) {
      store.dialogReset();
    }
  };
  const currentDialogPage = store.useCurrentContext();
  const userContext = store.user.use();
  const isDialogShow = store.isDialogShow.use();
  //TODO: 待处理登录问题
  return (
    <div className={"mt-8 flex justify-between"}>
      <Dialog modal={true} open={isDialogShow} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[400px]">
          <LoginRegisterModal>{currentDialogPage?.component}</LoginRegisterModal>
        </DialogContent>
      </Dialog>
      <Modal
        title={
          <div className="text-[#ffa54c]">
            <CheckOutlined />
            比赛报名成功
          </div>
        }
        centered={true}
        footer={() => (
          <Link href={"/contest"} className="rounded-md bg-primary px-4 py-2 text-base font-normal text-white">
            返回首页
          </Link>
        )}
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <p>
          亲爱的<span className="font-bold">{userContext?.uname}</span>
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;您已成功报名{title}，请在后台“我的比赛”中查看。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;请务必记住比赛时间，及时参赛哦</p>
      </Modal>
      {state == "可报名" ? (
        <CountdownTimer time={Math.floor((new Date(checkinEndAt as string).getTime() - new Date().getTime()) / 1000)} />
      ) : (
        <div />
      )}
      <div>
        <DetailStateApply
          isLogin={Boolean(userContext)}
          isApply={isApply}
          state={state}
          tid={tid}
          click={() => {
            setIsOpen(true);
          }}
        />
        <span
          onClick={() => store.dialogJumpTo("login")}
          className="ml-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white"
        >
          <ExportOutlined />
          &nbsp; 分享
        </span>
      </div>
    </div>
  );
};
export default ContestDetailFooter;
