"use client";
import { request } from "@/lib/request";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import { CheckOutlined, ExportOutlined } from "@ant-design/icons";
import CountdownTimer from "./count-down";
import { useState } from "react";
import store from "@/store/login";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginRegisterModal from "@/components/login/login-register-modal";

const handleClickApply = async (tid: string, setIsOpen: () => void) => {
  // const { data } =
  await request.post(`/contest/${tid as "{tid}"}`, { operation: "attend" });
  // if(data){

  // }
  setIsOpen();
  // console.log(data);

  return 0;
};
const DetailStateApply: React.FC<{
  isLogin: boolean;
  isApply: boolean;
  state: string;
  tid: string;
  click: () => void;
}> = (props) => {
  const router = useRouter();
  const { isLogin, isApply, state, tid, click } = props;
  if (state == "预告中") {
    return <></>;
  } else if (state == "可报名") {
    if (isApply) return <span>已报名</span>;
    else
      return (
        <span
          className="py-2 px-4 text-sm font-normal rounded-lg text-white border border-[#FF7D37] bg-[#FF7D37] cursor-pointer"
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
  } else if (state == "进行中") {
    if (isApply) {
      return (
        <span
          className="py-2 px-4 text-sm font-normal rounded-lg text-white border border-[#FF7D37] bg-[#FF7D37] cursor-pointer"
          onClick={() => router.push(`/contest/${tid}/problems`)}
        >
          查看题目
        </span>
      );
    } else {
      if (isApply) {
        return (
          <span className="py-2 px-4 text-sm font-normal rounded-lg text-white border border-[#FF7D37] bg-[#FF7D37] cursor-not-allowed">
            查看结果
          </span>
        );
      }
      return (
        <span className="py-2 px-4 text-sm font-normal rounded-lg text-white border border-[#FF7D37] bg-[#FF7D37] cursor-not-allowed">
          报名已结束
        </span>
      );
    }
  } else {
    if (isApply) {
      return <Button>查看结果</Button>;
    } else {
      return (
        <span className="py-2 px-4 text-sm font-normal rounded-lg text-white border border-[#706f6e] bg-[#706f6e] cursor-not-allowed">
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
    <div className={"flex justify-between mt-8"}>
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
          <Link href={"/contest"} className="text-white bg-[#FF7D37] px-4 py-2 text-base font-normal rounded-md">
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
          className="ml-2 py-2 px-4 text-sm font-normal rounded-lg text-white border border-[#ffa54c] bg-[#fb9c3c] cursor-pointer"
        >
          <ExportOutlined />
          分享
        </span>
      </div>
    </div>
  );
};
export default ContestDetailFooter;