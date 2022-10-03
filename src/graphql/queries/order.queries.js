import { gql } from "@apollo/client";




export const GET_ORDERS = gql`
query getOrders {
  getOrders {
    id
    order {
      name
      price
      quantity
      id
    }
    createdAt
    state
    total
    client {
      id
      name
      lastname
      email
      phone
    }
  }
}
`;
