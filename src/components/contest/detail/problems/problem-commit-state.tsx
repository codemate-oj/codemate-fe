import ProblemsCommitState from "@/constants/problems-state";
interface PropsType {
  state: number;
  score: number;
}
const ProblemCommitState: React.FC<PropsType> = (porps) => {
  const { state, score } = porps;
  const stateText =
    ProblemsCommitState[state as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18];
  let color = "green";
  if (score !== 100) {
    color = "red";
  }
  const className = `text-${color}-500 border-[${color}]`;

  return (
    <div
      className={
        "absolute left-0 top-0 flex h-full w-full items-center justify-center border-0 border-l-4 text-center " +
        className
      }
    >
      {score} {stateText}
    </div>
  );
};
export default ProblemCommitState;
