import { STATUS_TEXTS, StatusType } from "@/constants/judge-status";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
interface PropsType {
  state: number;
  score: number;
}
const ProblemCommitState: React.FC<PropsType> = (porps) => {
  const { state, score } = porps;
  const stateText = STATUS_TEXTS[state as StatusType];

  const textColor = score == 100 ? "[rgb(42,198,73)]" : "red";
  const borderColor = score == 100 ? " border-green-500 " : " ";

  return (
    <div
      className={`absolute font-medium top-0 left-0  w-full h-full border-l-4 border-opacity-50 flex items-center justify-center text-center text-${textColor} ${borderColor}`}
    >
      {score == 100 ? (
        <>
          <CheckOutlined />
          <span className={`text-${textColor}-500`}>
            &nbsp;
            {score}
            &nbsp;
          </span>
        </>
      ) : (
        <>
          <CloseOutlined />
          <span className={`text-${textColor}-500`}>
            &nbsp;
            {score}
            &nbsp;
          </span>
        </>
      )}
      {stateText}
    </div>
  );
};
export default ProblemCommitState;
