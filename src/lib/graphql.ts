import { ApolloClient, InMemoryCache } from "@apollo/client";
import { isBrowser } from "./utils";

const client = new ApolloClient({
  uri: isBrowser() ? "/api/api" : `${process.env.API_URL ?? "https://beta.aioj.net/api/"}api`,
  cache: new InMemoryCache(),
});

export default client;
