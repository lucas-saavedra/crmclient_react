import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import apolloClient from './config/apollo'
import { OrderState } from './context/orders/OrderState'

import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserContext } from './context/user/userContext'
import UserProvider from './context/user/UserProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <OrderState >
          <App />
        </OrderState>
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode >
)
