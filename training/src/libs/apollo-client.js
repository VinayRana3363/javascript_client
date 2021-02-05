import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from '@apollo/client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from 'apollo-utilities';

const httplink = new HttpLink({ uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI });

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_APOLLO_SUBSCRIPTION_GRAPHQL_URI,
  otions: {
    reconnect: true,
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httplink,
);

const Apolloclient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default Apolloclient;
