export async function GET() {
  return Response.json({
    status: 200,
    data: [
      {
        key: "赛事题库",
        label: "赛事题库",
        children: [
          {
            key: "1",
            label: "赛事题库1",
          },
          {
            key: "2",
            label: "赛事题库2",
          },
          {
            key: "3",
            label: "赛事题库3",
          },
        ],
      },
      {
        key: "专项题库",
        label: "专项题库",
        children: [
          {
            key: "4",
            label: "专项题库1",
          },
          {
            key: "5",
            label: "专项题库2",
          },
          {
            key: "6",
            label: "专项题库3",
          },
        ],
      },
    ],
  });
}
