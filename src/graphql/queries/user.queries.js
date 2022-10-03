import { gql } from "@apollo/client";
export const GET_USER = gql`
  query {
    getUser {
      name
      lastname
      email
      id
    }
  }
`;
