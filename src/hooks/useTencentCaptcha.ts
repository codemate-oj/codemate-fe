import { useCallback, useState } from "react";

const APP_ID = process.env.NEXT_PUBLIC_CAPTCHA_APP_ID;

export default function useTencentCaptcha(container?: HTMLElement | string) {
  const [verifyPassed, setVerifyPassed] = useState(false);
  const doVerify = useCallback(async () => {
    if (!APP_ID) throw new Error("CaptchaAppID not found in env");
    let element: HTMLElement | null = null;
    if (container) {
      if (typeof container === "string") {
        element = document.getElementById(container);
      } else {
        element = container;
      }
    }
    return new Promise<ICaptchaResult>((resolve, reject) => {
      let captcha: TencentCaptcha;
      if (element) {
        captcha = new TencentCaptcha(
          element,
          APP_ID,
          (result) => {
            if (result.ret === 0) {
              setVerifyPassed(true);
              resolve(result);
            } else {
              setVerifyPassed(false);
              reject(result);
            }
          },
          {
            type: "embed",
          }
        );
      } else {
        captcha = new TencentCaptcha(
          APP_ID,
          (result) => {
            if (result.ret === 0) {
              setVerifyPassed(true);
              resolve(result);
            } else {
              setVerifyPassed(false);
              reject(result);
            }
          },
          {}
        );
      }
      captcha.show();
    });
  }, [container]);

  return { doVerify, verifyPassed };
}
