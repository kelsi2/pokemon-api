import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Routes from "./routes";

// Setup Apollo Client

const uri = "http://localhost:5000/api";
const cache = new InMemoryCache();
const link = createHttpLink({ uri });

const client = new ApolloClient({
  uri,
  cache,
  link,
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
