import { gql } from "@apollo/client";

const IS_ADMIN = gql`
  query isAdmin($token: String!) {
    isAdmin(token: $token)
  }
`;

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
  }
`;

const GET_LAST_FOUR_PRODUCTS = gql`
  query getLastFourProducts {
    getLastFourProducts {
      id
      description
      name
      image
      price
      quantity
    }
  }
`;

const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
      products {
        id
      }
    }
  }
`;

const GET_ALL_CUSTOMERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      lastname
      firstname
      email
      phone
    }
  }
`;

const GET_ALL_RESERVATIONS = gql`
  query getAllReservations {
    getAllReservations {
      id
      start
      end
      price
      status
      product {
        id
        name
      }
      order {
        id
        user {
          id
          email
        }
      }
    }
  }
`;

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
  }
`;

const GET_USER = gql`
  query getUser($token: String!) {
    getUser(token: $token) {
      firstname
      lastname
      id
      email
      phone
    }
  }
`;

export {
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  GET_ALL_CUSTOMERS,
  GET_ALL_RESERVATIONS,
  GET_LAST_FOUR_PRODUCTS,
  GET_PRODUCTS_BY_DATE,
  GET_USER,
  IS_ADMIN,
};
