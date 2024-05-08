namespace Hydro {
  type UID = number;

  export const enum UserGender {
    Male = 0,
    Female,
    NotGiven,
  }

  export interface UiContext {
    SWConfig: {
      domains: string[];
      hosts: string[];
      preload?: any;
    };
    cdn_prefix: string;
    url_prefix: string;
    ws_prefix: string;
    domainId: string;
    domain: {
      _id: string;
      avatar: string;
      bulletin: string;
      lower: string;
      name: string;
      owner: UID;
      roles: Record<string, any>;
      [key: string]: any;
    };
    [key: string]: any;
  }

  export interface UserContext {
    // Basic User Info
    authn: boolean;
    _id: UID;
    uname: string;
    mail: string;
    gender: UserGender;
    avatar: string;
    avatarUrl: string;

    // Additional Info
    backgroundImage: string;
    loginat: string;
    regat: string;
    fontFamily: string;
    theme: "light" | "dark";
    timeZone: string;

    // Code Style
    codeLang: string;
    codeFontFamily: string;
    formatCode: boolean;
    monacoTheme: string;
    preferredEditorType: string;

    // Security
    hashType: string;
    tfa: boolean;

    // Permission
    groups: string[];
    perm: string;
    priv: number;
    role: string;
    rpInfo: Record<string, any>;
    scope: string;

    // Domain Related
    domains: string[];
    pinnedDomains: string[];

    [key: string]: any;
  }

  export interface HydroResponse {
    UiContext: UiContext;
    UserContext?: UserContext;
    [key: string]: any;
  }

  export interface RedirectResponse extends HydroResponse {
    url: string;
  }

  export interface HydroError extends Error {
    params?: any[];
    code?: number;
  }

  export interface ErrorResponse extends HydroResponse {
    error: HydroError;
  }
}
