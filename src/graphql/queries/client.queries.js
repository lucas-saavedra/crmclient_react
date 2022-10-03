import { gql } from "@apollo/client";

export const GET_CLIENT = gql`
  query getClientId($id: ID!) {
    getClient(id: $id) {
      id
      name
      lastname
      email
      organization
      phone
      createdAt
      updatedAt
    }
  }
`;
export const GET_CLIENTS_SELLER = gql`
query {
  getClientsSeller {
      name
      id
      lastname
      email
      organization
      phone
      createdAt
      updatedAt
    }
  }
  `