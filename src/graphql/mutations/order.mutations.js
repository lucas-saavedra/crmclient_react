import { gql } from "@apollo/client";

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput!) {
    newOrder(input: $input) {
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
export const UPDATE_ORDER_STATE = gql`
  mutation ($id: ID!, $input: OrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      state
    }
  }
`;
export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;
