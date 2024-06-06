/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.yml" {
  const value: Record<string, any>;
  export default value;
}

interface NavItemType {
  name: string;
  href: Parameters<typeof Link>[0]["href"];
  isActive?: boolean;
  disabled?: boolean;
}

interface AgreementType {
  title: string;
  href: string;
  className?: string;
}

/**
 * 腾讯云Captcha回调结果
 *
 * @example
 * // 用户主动关闭验证码
 * res = {ret: 2, ticket: null}
 * // 验证成功
 * res = {ret: 0, ticket: "String", randstr: "String"}
 * // 请求验证码发生错误，验证码自动返回trerror_前缀的容灾票据
 * res = {ret: 0, ticket: "String", randstr: "String", errorCode: Number, errorMessage: "String"}
 */
interface ICaptchaResult {
  /**
   * 验证结果，0：验证成功。2：用户主动关闭验证码。
   */
  ret: number;
  /**
   * 验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
   */
  ticket: string;
  /**
   * 本次验证的随机串，后续票据校验时需传递该参数。
   */
  randstr: string;
  /**
   * 自定义透传参数。
   */
  CaptchaAppId?: string;
  /**
   * 自定义透传参数
   */
  bizState?: string;
  errorCode?: number;
  errorMessage?: string;
}

interface ICaptchaOptions {
  /** 自定义透传参数，业务可用该字段传递少量数据，该字段的内容会被带入 callback 回调的对象中。 */
  bizState?: any;
  /**
       * 开启自适应深夜模式或强制深夜模式。（VTT 空间语义验证暂不支持该功能）
          1. 开启自适应深夜模式: {"enableDarkMode": true}
          2. 强制深夜模式: {"enableDarkMode": 'force'}
       */
  enableDarkMode?: boolean | "force";
  /**
   * 仅支持移动端原生 webview 调用时传入，用来设置验证码 loading 加载弹窗的大小（注意，并非验证码弹窗大小）。
   * @example {"width": 140, "height": 140}
   */
  sdkOpts?: Record<string, unknown>;
  /**
   * 该参数仅为查看验证码宽高使用，请勿使用此参数直接设定宽高。
   * @param options 验证码实际的宽高; 该参数仅为查看验证码宽高使用，请勿使用此参数直接设定宽高。
   * @returns
   */
  ready?: (options: {
    sdkView: {
      width: number;
      height: number;
    };
  }) => void;
  /**
   * 隐藏帮助按钮或自定义帮助按钮链接。（VTT 空间语义验证暂不支持自定义链接）
   * @example
   * // 隐藏帮助按钮
   * {"needFeedBack": false }
   * // 自定义帮助链接
   * {"needFeedBack": 'url地址' }
   */
  needFeedBack?: boolean | string;
  /** 是否在验证码加载过程中显示loading框。不指定该参数时，默认显示loading框。 */
  loading?: boolean;
  /**
   * 指定验证码提示文案的语言，优先级高于控制台配置。（VTT 空间语义、文字点选验证暂不支持语言配置）
   * 支持传入值同 navigator.language 用户首选语言，大小写不敏感。
   */
  userLanguage?: string;
  /**
   * 定义验证码展示方式。
   *
   * `popup`（默认）弹出式，以浮层形式居中弹出展示验证码。
   *
   * `embed` 嵌入式，以嵌入指定容器元素中的方式展示验证码。
   */
  type?: "popup" | "embed";
  /**
   * CaptchaAppId 加密校验串，可选参数。
   */
  aidEncrypted?: string;
  showFn?: (duration: number, sid: string) => void;
}

declare class TencentCaptcha {
  constructor(CaptchaAppId: string, callback: (result: ICaptchaResult) => void, options: ICaptchaOptions);
  constructor(
    container: HTMLElement,
    CaptchaAppId: string,
    callback: (result: ICaptchaResult) => void,
    options: ICaptchaOptions
  );
  /**
   * 显示验证码，可以反复调用。
   */
  show(): void;
  /**
   * 隐藏验证码，可以反复调用。
   */
  destroy(): void;
  /**
   * 获取验证成功后的 ticket
   */
  getTicket(): { CaptchaAppId: string; ticket: string };
}
