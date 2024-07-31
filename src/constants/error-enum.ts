import ERROR_DATA_MAP from "@/constants/error.yml";

const enum ERROR_TYPE {
  UNKNOWN_SERVER_ERROR = -1,
  USER_NOT_LOGIN_ERROR = 0,
  VALIDATION_ERROR = 1,
  USER_NOT_FOUND_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  INVALID_PASSWORD_ERROR,
  PROBLEM_LIST_NOT_FOUND_ERROR,
  PRIVATE_PROBLEM_LIST_FORBIDDEN_ERROR,
  PROBLEM_NOT_FOUND_IN_LIST_ERROR,
  PROBLEM_HAS_NO_PREV_ERROR,
  PROBLEM_HAS_NO_NEXT_ERROR,
  CONTEST_INVITATION_INVALID_ERROR,
  USER_NOT_AUTHORIZED_ERROR,
  CONTEST_ATTEND_MULTIPLE_ERROR,
  PROBLEM_NOT_FOUND_ERROR,
}

/** ErrMsg(raw) -> ErrCode 映射 */
const ERROR_CODE_MAP = {} as Record<string, ERROR_TYPE>;
Object.keys(ERROR_DATA_MAP).forEach((key, index) => {
  ERROR_CODE_MAP[key] = index + 1;
});

/** ErrCode -> ErrMsg(cn) 映射 */
const ERROR_MAP = {} as Record<ERROR_TYPE, string>;
Object.keys(ERROR_DATA_MAP).forEach((key, index) => {
  ERROR_MAP[(index + 1) as ERROR_TYPE] = ERROR_DATA_MAP[key];
});

export { ERROR_CODE_MAP, ERROR_MAP, ERROR_TYPE };
