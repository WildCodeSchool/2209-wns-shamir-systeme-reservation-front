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

const GET_USER = gql`
query getUser($token: String!) {
  getUser(token: $token) {
    firstname
    lastname
    id
    email
    phone
  }
}`

export { GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_HOME_PRODUCTS, GET_PRODUCTS_BY_DATE, GET_USER };


