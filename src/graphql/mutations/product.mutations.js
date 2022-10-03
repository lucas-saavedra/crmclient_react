import { gql } from "@apollo/client";
export const ADD_PRODUCT = gql`
mutation($input: ProductInput!) {
    addProduct(input: $input) {
      id
      name,
      price,
      stock,
      createdAt,
      updatedAt
    }
  }
`
export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($id: ID!, $payload: ProductInput) {
    updateProduct(id: $id, payload: $payload) {
      id
      name
      stock
      price
      createdAt
      updatedAt
    }
  }
  
`
export const DELETE_PRODUCT = gql`
mutation Mutation($id: ID!) {
    deleteProduct(id: $id)
  }`