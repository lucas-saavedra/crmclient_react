import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
query GetProduct($id: String!) {
  getProduct(id: $id) {
    id
    name
    stock
    price

  }
}
`
export const GET_PRODUCTS = gql`
query getProducts {
    getProducts {
      id
      name
      stock
      price
      
    }
  }
`