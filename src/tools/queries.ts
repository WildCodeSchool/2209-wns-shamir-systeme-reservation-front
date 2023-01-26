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

const GET_HOME_PRODUCTS = gql`
query getHomeProducts {
  getHomeProducts {
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

const GET_PRODUCTS_BY_DATE = gql`
query getProductsByDate($dateFrom: String!, $dateTo: String!) {
  getProductsByDate(dateFrom: $dateFrom, dateTo: $dateTo) {
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

export { GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_HOME_PRODUCTS, GET_PRODUCTS_BY_DATE };