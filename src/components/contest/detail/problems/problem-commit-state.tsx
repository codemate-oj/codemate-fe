import { STATUS_TEXTS } from "@/constants/judge-status";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
interface PropsType {
  state: number;
  score: number;
}
type StatusType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 20 | 21 | 22 | 30;
const ProblemCommitState: React.FC<PropsType> = (porps) => {
  const { state, score } = porps;
  const stateText = STATUS_TEXTS[state as StatusType];

  let color = "rgb(42,198,73)";
  if (score !== 100) {
    color = "red";
  }
  // const className = `text-${color}-500 border-[${color}] `;

  return (
    <div
      className={`absolute font-medium top-0 left-0  w-full h-full border-l-4 flex items-center justify-center text-center text-[${color}]`}
    >
      {score == 100 ? (
        <>
          <CheckOutlined />
          <span className="text-[rgb(42,198,73)]-500">
            &nbsp;
            {score}&nbsp;
          </span>
        </>
      ) : (
        <>
          <CloseOutlined />
          <span className="text-red-500">
            &nbsp;
            {score}&nbsp;
          </span>
        </>
      )}
      {stateText}
    </div>
  );
};
export default ProblemCommitState;
