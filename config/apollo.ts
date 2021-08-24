import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';

let clientSingleton: any;

export function apolloClient(): any {
  if (!clientSingleton) {
    const httpLink = createHttpLink({ uri: `https://graphql-weather-api.herokuapp.com/` });
    clientSingleton = new ApolloClient({
      link: from([httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
      },
    });
  }

  return clientSingleton;
}
