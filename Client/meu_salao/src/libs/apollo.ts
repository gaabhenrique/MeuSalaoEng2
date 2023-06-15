import { ApolloClient, InMemoryCache } from "@apollo/client";

const config = {
  url: "https://meusalaowebservice.onrender.com/graphql",
  cache: new InMemoryCache(),
};

export const client = new ApolloClient(config);
