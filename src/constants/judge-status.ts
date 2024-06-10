// Please note that accepted < others, rp system uses this feature.
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
export const STATUS_FORMAT = 31 as const;
export const STATUS_IGNORED = 30 as const;

export const STATUS_TEXTS = {
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
  [STATUS_ACCEPTED]: "pass",
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
export type StatusType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 20 | 21 | 22 | 30;
