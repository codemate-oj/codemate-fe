"use client";
import client from "@/lib/graphql";
import { ApolloProvider } from "@apollo/client";
import React from "react";

const ApolloContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloContextProvider;
