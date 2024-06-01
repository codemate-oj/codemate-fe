export const forwardAuthClient = () => {
  const sid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("sid="))
    ?.split("=")[1];

  return {
    credentials: "include" as RequestCredentials,
    headers: {
      Authorization: `Bearer ${sid ?? ""}`,
    },
  };
};
