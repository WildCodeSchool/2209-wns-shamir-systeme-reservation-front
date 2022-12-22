import { gql } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
query getAllProducts {
  getAllProducts {
    category {
      name
      id
    }
    description
    id
    image
    name
    price
    quantity
  }
}`

export {GET_ALL_PRODUCTS};