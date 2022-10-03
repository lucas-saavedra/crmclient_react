import { gql } from "@apollo/client";
export const GET_USER = gql`
  query {
    getUser {
      roles
      name
      lastname
      email
      id
    }
  }
`;
