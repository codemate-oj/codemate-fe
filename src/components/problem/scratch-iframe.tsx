"use client";
import { cn } from "@/lib/utils";
import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { request } from "@/lib/request";
import loginStore from "@/store/login";
import { useLockFn } from "ahooks";
import { loginGuard } from "@/lib/login-guard";
import { HydroError } from "@/lib/error";
import { toast } from "sonner";

interface IProps {
  pid: string;
  onExit?: () => void;
}

const ScratchIframe: React.FC<IProps> = ({ pid, onExit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true); // 加载完成后触发动画
    }, 50); // 短暂延迟以确保加载完成
    iframeRef.current?.addEventListener?.("load", () => {
      setIsLoaded(true);
    });

    const onIframeMessage = (e: MessageEvent) => {
      if (e.data?.type === "ready") {
        setIsReady(true);
      }
    };
    window.addEventListener("message", onIframeMessage);

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      // 退出页面时触发确认
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("message", onIframeMessage);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  const handleExit = () => {
    Modal.confirm({
      title: "确定要退出吗？",
      content: "退出后，所有未提交的答案将会丢失",
      okText: "确认退出",
      cancelText: "留在本页",
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        setIsVisible(false);
        setTimeout(() => {
          onExit?.();
        }, 500);
      },
    });
  };

  const readCode = (timeout = 10000) => {
    return new Promise<File>((resolve, reject) => {
      if (iframeRef.current === null) {
        reject(new Error("null-reference"));
        return;
      }
      const onMessage = (e: MessageEvent) => {
        if (e.data?.type === "sb3") {
          clearTimeout(timer);
          window.removeEventListener("message", onMessage);
          resolve(e.data.data);
        }
      };
      const timer = setTimeout(() => {
        window.removeEventListener("message", onMessage);
        reject(new Error("timeout"));
      }, timeout);
      window.addEventListener("message", onMessage);
      iframeRef.current.contentWindow?.postMessage({ type: "export" }, "*");
    });
  };

  const handleSubmit = useLockFn(async () => {
    await loginGuard(async () => {
      if (isExporting) return;
      setIsExporting(true);
      try {
        const sb3File = await readCode();
        const data = new FormData();
        data.append("lang", "scratch");
        data.append(
          "file",
          new File([sb3File], `scratch_submit_user_${loginStore.user.get()?._id ?? 0}_${Date.now()}.zip`, {
            type: sb3File.type,
          })
        );
        // @ts-expect-error 后端未更新类型
        const url = await request.post(`/p/${pid}/submit` as "/p/{pid}/submit", data, {
          transformData: (data) => data.data.url,
        });
        window.open(url);
      } catch (e) {
        if (e instanceof HydroError) {
          toast.error(`提交失败：${e.message}`);
        } else if (e instanceof Error) {
          switch (e.message) {
            case "null-reference":
              toast.error("图形化平台加载失败，请刷新页面后重试");
              break;
            case "timeout":
              toast.error("代码导出超时，请尝试重新提交");
              break;
            default:
              break;
          }
        } else {
          throw e;
        }
      }
      setIsExporting(false);
    });
  });

  return (
    <div
      className={cn(
        "slide-up fixed inset-0 z-50 h-screen w-screen overflow-hidden bg-[#855CD6] transition-transform duration-500 dark:bg-[#46238B]",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="relative h-full w-full">
        <aside className="absolute right-[30px] top-[8px] z-10 flex items-center space-x-4 text-sm">
          {isReady && (
            <button
              className={cn("flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[#855CD6]", {
                "opacity-50": isExporting,
              })}
              onClick={handleSubmit}
            >
              提交评测
            </button>
          )}
          <button className="rounded-lg bg-white px-3 py-1.5 text-[#855CD6]" onClick={handleExit}>
            退出
          </button>
        </aside>
        {!isLoaded && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center space-y-5 text-center">
            <div className="loader-bar" />
            <p className="text-white">图形化平台加载中，请耐心等待...</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          id="scratch_frame"
          className="absolute left-0 top-0 h-full w-full"
          src="/api/scratch.html"
        />
      </div>
    </div>
  );
};

export default ScratchIframe;
