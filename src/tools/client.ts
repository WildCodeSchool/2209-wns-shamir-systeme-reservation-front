import { ApolloClient, InMemoryCache } from '@apollo/client';

// init connection to back
const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

export default client;