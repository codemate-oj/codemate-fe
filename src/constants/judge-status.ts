export const enum STATUS_ENUM {
  STATUS_WAITING = 0,
  STATUS_ACCEPTED,
  STATUS_WRONG_ANSWER,
  STATUS_TIME_LIMIT_EXCEEDED,
  STATUS_MEMORY_LIMIT_EXCEEDED,
  STATUS_OUTPUT_LIMIT_EXCEEDED,
  STATUS_RUNTIME_ERROR,
  STATUS_COMPILE_ERROR,
  STATUS_SYSTEM_ERROR,
  STATUS_CANCELED,
  STATUS_ETC,
  STATUS_JUDGING = 20,
  STATUS_COMPILING,
  STATUS_FETCHED,
  STATUS_IGNORED = 30,
  STATUS_FORMAT,
}

export type StatusType = STATUS_ENUM;

export const STATUS_WAITING = 0 as const;
export const STATUS_ACCEPTED = 1 as const;
export const STATUS_WRONG_ANSWER = 2 as const;
export const STATUS_TIME_LIMIT_EXCEEDED = 3 as const;
export const STATUS_MEMORY_LIMIT_EXCEEDED = 4 as const;
export const STATUS_OUTPUT_LIMIT_EXCEEDED = 5 as const;
export const STATUS_RUNTIME_ERROR = 6 as const;
export const STATUS_COMPILE_ERROR = 7 as const;
export const STATUS_SYSTEM_ERROR = 8 as const;
export const STATUS_CANCELED = 9 as const;
export const STATUS_ETC = 10 as const;
export const STATUS_JUDGING = 20 as const;
export const STATUS_COMPILING = 21 as const;
export const STATUS_FETCHED = 22 as const;
export const STATUS_IGNORED = 30 as const;
export const STATUS_FORMAT = 31 as const;

export const STATUS_TEXTS: Record<STATUS_ENUM, string> = {
  [STATUS_WAITING]: "Waiting",
  [STATUS_ACCEPTED]: "Accepted",
  [STATUS_WRONG_ANSWER]: "Wrong Answer",
  [STATUS_TIME_LIMIT_EXCEEDED]: "Time Exceeded",
  [STATUS_MEMORY_LIMIT_EXCEEDED]: "Memory Exceeded",
  [STATUS_OUTPUT_LIMIT_EXCEEDED]: "Output Exceeded",
  [STATUS_RUNTIME_ERROR]: "Runtime Error",
  [STATUS_COMPILE_ERROR]: "Compile Error",
  [STATUS_SYSTEM_ERROR]: "System Error",
  [STATUS_CANCELED]: "Cancelled",
  [STATUS_ETC]: "Unknown Error",
  [STATUS_JUDGING]: "Running",
  [STATUS_COMPILING]: "Compiling",
  [STATUS_FETCHED]: "Fetched",
  [STATUS_IGNORED]: "Ignored",
  [STATUS_FORMAT]: "Format Error",
};

export const STATUS_CODES = {
  [STATUS_WAITING]: "pending",
  [STATUS_ACCEPTED]: "success",
  [STATUS_WRONG_ANSWER]: "fail",
  [STATUS_TIME_LIMIT_EXCEEDED]: "fail",
  [STATUS_MEMORY_LIMIT_EXCEEDED]: "fail",
  [STATUS_OUTPUT_LIMIT_EXCEEDED]: "fail",
  [STATUS_RUNTIME_ERROR]: "fail",
  [STATUS_COMPILE_ERROR]: "fail",
  [STATUS_SYSTEM_ERROR]: "fail",
  [STATUS_CANCELED]: "ignored",
  [STATUS_ETC]: "fail",
  [STATUS_JUDGING]: "progress",
  [STATUS_COMPILING]: "progress",
  [STATUS_FETCHED]: "progress",
  [STATUS_IGNORED]: "ignored",
};

/**
 * Whether to show detail about each test case for a submission status
 */
export const STATUS_SCRATCHPAD_SHOW_DETAIL_FLAGS = {
  [STATUS_WAITING]: false,
  [STATUS_ACCEPTED]: true,
  [STATUS_WRONG_ANSWER]: true,
  [STATUS_TIME_LIMIT_EXCEEDED]: true,
  [STATUS_MEMORY_LIMIT_EXCEEDED]: true,
  [STATUS_RUNTIME_ERROR]: true,
  [STATUS_COMPILE_ERROR]: false,
  [STATUS_SYSTEM_ERROR]: false,
  [STATUS_CANCELED]: false,
  [STATUS_ETC]: false,
  [STATUS_JUDGING]: false,
  [STATUS_COMPILING]: false,
  [STATUS_FETCHED]: false,
  [STATUS_IGNORED]: false,
};

/**
 * Short text to show in Scratchpad mode
 */
export const STATUS_SCRATCHPAD_SHORT_TEXTS = {
  [STATUS_ACCEPTED]: "AC",
  [STATUS_WRONG_ANSWER]: "WA",
  [STATUS_TIME_LIMIT_EXCEEDED]: "TLE",
  [STATUS_MEMORY_LIMIT_EXCEEDED]: "MLE",
  [STATUS_RUNTIME_ERROR]: "RTE",
};

export const STATUS_TEXT_COLORS: Record<STATUS_ENUM, string> = {
  [STATUS_WAITING]: "invalid",
  [STATUS_ACCEPTED]: "success",
  [STATUS_WRONG_ANSWER]: "fail",
  [STATUS_TIME_LIMIT_EXCEEDED]: "fail",
  [STATUS_MEMORY_LIMIT_EXCEEDED]: "fail",
  [STATUS_OUTPUT_LIMIT_EXCEEDED]: "fail",
  [STATUS_RUNTIME_ERROR]: "fail",
  [STATUS_COMPILE_ERROR]: "fail",
  [STATUS_SYSTEM_ERROR]: "fail",
  [STATUS_CANCELED]: "invalid",
  [STATUS_ETC]: "fail",
  [STATUS_JUDGING]: "progress",
  [STATUS_COMPILING]: "progress",
  [STATUS_FETCHED]: "progress",
  [STATUS_IGNORED]: "invalid",
  [STATUS_FORMAT]: "fail",
};

// 所有pass都用material-symbols:check
// 所有fail都用material-symbols:close
// 所有progress都用material-symbols:hourglass-bottom-rounded
// 所有invalid都用material-symbols:close
export const STATUS_ICONS: Record<STATUS_ENUM, string> = {
  [STATUS_WAITING]: "material-symbols:schedule-outline-rounded",
  [STATUS_ACCEPTED]: "material-symbols:check",
  [STATUS_WRONG_ANSWER]: "material-symbols:close",
  [STATUS_TIME_LIMIT_EXCEEDED]: "material-symbols:close",
  [STATUS_MEMORY_LIMIT_EXCEEDED]: "material-symbols:close",
  [STATUS_OUTPUT_LIMIT_EXCEEDED]: "material-symbols:close",
  [STATUS_RUNTIME_ERROR]: "material-symbols:close",
  [STATUS_COMPILE_ERROR]: "material-symbols:close",
  [STATUS_SYSTEM_ERROR]: "material-symbols:close",
  [STATUS_CANCELED]: "material-symbols:close",
  [STATUS_ETC]: "material-symbols:close",
  [STATUS_JUDGING]: "material-symbols:hourglass-bottom-rounded",
  [STATUS_COMPILING]: "material-symbols:hourglass-bottom-rounded",
  [STATUS_FETCHED]: "material-symbols:hourglass-bottom-rounded",
  [STATUS_IGNORED]: "material-symbols:close",
  [STATUS_FORMAT]: "material-symbols:close",
};
