import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://api.shamir6.wns.wilders.dev",
});

// Middleware pour intercepter
const authLink = setContext((_, { headers }) => {
  // get token in localStore
  const token = localStorage.getItem("token");

  // stock token in headers
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// init connection to back (with a link the middleware + httpLink)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
