import ApolloClient from 'apollo-client';
import fetch from 'isomorphic-fetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WEWORK_PASSWORD } from './constants';


const httpLink = createHttpLink({
	uri: require('../getServerUrl')(),
	fetch
})

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem(WEWORK_PASSWORD);
	// return the headers to the context so httpLink can read them
	return {
	  headers: {
		...headers,
		authorization: localStorage.getItem(WEWORK_PASSWORD),
	  }
	}
  });

  export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
  });