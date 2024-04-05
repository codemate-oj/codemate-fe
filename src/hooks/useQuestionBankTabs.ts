import { getQuestionBankTabs } from "@/request/home/question-bank";
import useSWR from "swr";
const useQuestionBankTabs = () => {
  const { data } = useSWR("questionBankTabs", getQuestionBankTabs);
  return {
    questionBankTabs: data?.data,
  };
};

export default useQuestionBankTabs;
