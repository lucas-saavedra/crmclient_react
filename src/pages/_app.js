import { ApolloProvider } from '@apollo/client';
import apolloClient from '../config/apollo';
import { OrderState } from '../context/orders/OrderState';

const MyApp = ({ Component, pageProps }) => {

    return (

        <ApolloProvider client={apolloClient}>
            <OrderState>
                <Component {...pageProps} />
            </OrderState>
        </ApolloProvider>
    )
}
export default MyApp