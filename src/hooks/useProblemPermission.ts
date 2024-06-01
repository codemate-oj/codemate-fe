import storeLogin from "@/store/login";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import storeModal from "@/store/modal";
import { usePathname } from "next/navigation";

export const useProblemPermission = () => {
  const userContext = storeLogin.user.get();
  const pathname = usePathname();

  const { run: runCheckProblemPermission } = useRequest(
    async ({ pid, assign, title }) => {
      const { data } = await request.post(
        `/p/${pid}` as "/p/{pid}",
        { operation: "check" },
        {
          transformData: (data) => {
            return data;
          },
        }
      );
      if (!data.hasPerm) {
        if (!userContext) {
          storeLogin.dialogJumpTo("login");
          storeLogin.isDialogShow.set(true);
          return;
        }
        if (data.activation?.includes("group")) {
          storeModal.modalJumpTo("activate-question-group", {
            pid,
            group: assign,
          });
          storeModal.isModalShow.set(true);
        } else if (data.activation?.includes("point")) {
          storeModal.modalJumpTo("activate-question-point", {
            pid,
            group: assign,
            title,
          });
          storeModal.isModalShow.set(true);
        }
        return { hasPermission: false };
      } else {
        return { pid, hasPermission: true };
      }
    },
    {
      manual: true,
      onSuccess: (data) => {
        if (data?.hasPermission && pathname === "/") {
          window.open(`/p/${data?.pid}`);
        }
      },
    }
  );

  return { runCheckProblemPermission };
};
