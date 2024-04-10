type UID = number;

const enum UserGender {
  Male = 0,
  Female,
  NotGiven,
}

interface HydroUiContext {
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

interface HydroUserContext {
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

interface HydroResponse {
  UiContext: HydroUiContext;
  UserContext?: HydroUserContext;
  [key: string]: any;
}
