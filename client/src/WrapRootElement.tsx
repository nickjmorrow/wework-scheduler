import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './client';

export const WrapRootElement : React.FC = ({children}) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}