import React from "react";
import ContestDetail from "@/components/contest/detail/detail";
const Detail = ({ params }: { params: { tid: string } }) => {
  const { tid } = params;
  return (
    <div>
      <ContestDetail tid={tid} />
    </div>
  );
};
export default Detail;
