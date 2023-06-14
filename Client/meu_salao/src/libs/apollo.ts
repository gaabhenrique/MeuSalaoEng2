import { ApolloClient, InMemoryCache } from "@apollo/client";

const config = {
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
};

export const client = new ApolloClient(config);
