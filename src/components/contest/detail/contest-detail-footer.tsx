"use client";
import { ExportOutlined } from "@ant-design/icons";
import ActionButton from "./action-button";
import type { getContestState } from "@/lib/utils";
import { HydroError } from "@/lib/error";
import { ERROR_TYPE } from "@/constants/error-enum";
import NiceModal from "@ebay/nice-modal-react";
import ApplyFailModal from "./modals/apply-fail-modal";
import { useRouter } from "next/navigation";
import { request } from "@/lib/request";
import loginStore from "@/store/login";
import { useLockFn } from "ahooks";
import ApplySuccessModal from "./modals/apply-success-modal";
import dynamic from "next/dynamic";

const CountdownTimer = dynamic(() => import("./count-down"), { ssr: false });

interface IProps {
  isApply: boolean;
  status: ReturnType<typeof getContestState>;
  tdoc: {
    docId: string;
    title: string;
    checkinEndAt?: string;
  };
}

const ContestDetailFooter: React.FC<IProps> = ({ isApply, status, tdoc }) => {
  const router = useRouter();
  const user = loginStore.user.use();

  const handleApply = useLockFn(async () => {
    if (user === null) {
      loginStore.showLoginDialog();
      return;
    }
    try {
      await request.post(`/contest/${tdoc.docId}` as "/contest/{tid}", {
        operation: "attend",
      });
      await NiceModal.show(ApplySuccessModal, {
        username: user.uname,
        contestTitle: tdoc.title,
      });
      window.location.reload();
    } catch (e) {
      if (e instanceof HydroError) {
        if (e.code === ERROR_TYPE.USER_NOT_AUTHORIZED_ERROR) {
          NiceModal.show(ApplyFailModal, {
            error: e,
            customMessage: "该比赛要求用户实名认证后才能参加",
            actions: [
              {
                text: "去实名认证",
                action: (hide) => {
                  router.push("/user/setting");
                  hide();
                },
              },
            ],
          });
        } else {
          NiceModal.show(ApplyFailModal, { error: e });
        }
      } else {
        throw e;
      }
    }
  });

  return (
    <div className={"mt-8 flex justify-between"}>
      {status == "可报名" && tdoc.checkinEndAt && (
        <CountdownTimer time={Math.floor((new Date(tdoc.checkinEndAt).getTime() - new Date().getTime()) / 1000)} />
      )}
      <div>
        <ActionButton isApply={isApply} status={status} tdoc={tdoc} onApply={handleApply} />
        <span className="ml-2 cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-normal text-white">
          <ExportOutlined />
          &nbsp; 分享
        </span>
      </div>
    </div>
  );
};
export default ContestDetailFooter;
