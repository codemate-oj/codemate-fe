import { STATUS_TEXTS, StatusType } from "@/constants/judge-status";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
interface PropsType {
  state: number;
  score: number;
}
const ProblemCommitState: React.FC<PropsType> = (porps) => {
  const { state, score } = porps;
  const stateText = STATUS_TEXTS[state as StatusType];

  const textColor = score == 100 ? "text-green-400" : "text-red-500";
  const borderColor = score == 100 ? " border-green-500 " : " ";

  return (
    <div
      className={`absolute font-medium top-0 left-0  w-full h-full border-l-4 border-opacity-50 flex items-center justify-center text-center text-${textColor} ${borderColor}`}
    >
      {score == 100 ? (
        <>
          <CheckOutlined />
          <span className={textColor}>
            &nbsp;
            {score}
            &nbsp;
          </span>
        </>
      ) : (
        <>
          <CloseOutlined />
          <span className={textColor}>
            &nbsp;
            {score}
            &nbsp;
          </span>
        </>
      )}
      {<span className={textColor}>{stateText}</span>}
    </div>
  );
};
export default ProblemCommitState;
