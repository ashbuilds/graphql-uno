import bindApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const withApollo = bindApollo(
  ({ initialState }) => new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache().restore(initialState || {}),
  }),
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  },
);

export default withApollo;
