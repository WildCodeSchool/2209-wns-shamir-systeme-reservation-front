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

const GET_ALL_CATEGORIES = gql`
query getAllCategories {
  getAllCategories {
      id
      name
  }
}`

export { GET_ALL_PRODUCTS, GET_ALL_CATEGORIES };