import { gql } from "@apollo/client";

export const BEST_SELLERS = gql`
query bestSellers {
    bestSellers {
      total
      seller {
        name
        lastname
        email
      }
    }
  }
  
`
export const BEST_CLIENTS = gql`
query bestClients {
    bestClients {
      total
      client {
        name
        lastname
        email
        phone
      }
    }
  }
  
`