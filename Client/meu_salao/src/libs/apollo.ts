import { ApolloClient, InMemoryCache } from "@apollo/client";

const config = {
  uri: "https://meusalaowebservice.onrender.com/graphql",
  cache: new InMemoryCache(),
};

export const client = new ApolloClient(config);
