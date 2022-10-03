import { gql } from "@apollo/client";

export const ADD_CLIENT = gql`
  mutation AddClient($input: ClientInput!) {
    addClient(input: $input) {
      id
      name
      lastname
      email
      phone
      organization
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClientId($id: ID!, $payload: ClientInput) {
    updateClient(id: $id, payload: $payload) {
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
export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;