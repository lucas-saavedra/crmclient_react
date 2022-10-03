import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httplink = createHttpLink({
    uri: import.meta.env.VITE_SERVER_URI,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
const apolloClient = new ApolloClient({
    /*  connectToDevTools: true, */
    cache: new InMemoryCache({
        typePolicies: {
            OrderGroup: {
                // In an inventory management system, products might be identified
                // by their UPC.
                keyFields: false,
            },
        }
    }),
    link: authLink.concat(httplink),
});

export default apolloClient;
