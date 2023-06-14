import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { client } from "./libs/apollo.ts";
import { ApolloProvider } from "@apollo/client/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
