import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { HttpLink, split } from "@apollo/client";

import { getToken } from "./auth";

const token = getToken();

const httpLink = new HttpLink({
  uri: "http://192.168.0.114:4000/",
  headers: {
    authorization: token ? token : "",
  },
});

const wsLink = new WebSocketLink({
  uri: "ws://192.168.0.114:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
