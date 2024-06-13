import PageTitle from "@/components/common/page-title";
import Scoreboard from "@/components/contest/detail/scoreboard/contest-detail-scoreboard";

const ContestScoreboard = ({ params }: { params: { tid: string } }) => {
  const { tid } = params;
  return (
    <>
      <PageTitle>竞技场-排行榜</PageTitle>
      <Scoreboard tid={tid} />
    </>
  );
};
export default ContestScoreboard;
