import { request } from "../request";

export const getQuestionBankTabs = async () => {
  return request.get("/test");
};
