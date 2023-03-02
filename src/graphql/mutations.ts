import { gql } from "@apollo/client";

export const GET_TOKEN = gql`
  mutation GetToken($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $phone: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      phone: $phone
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
    )
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductType!) {
    createProduct(product: $product) {
      id
      name
      price
      quantity
      image
      description
      category {
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($product: ProductType!, $updateProductId: Float!) {
    updateProduct(product: $product, id: $updateProductId) {
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: Float!) {
    deleteProduct(id: $deleteProductId)
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: Float!) {
    deleteCategory(id: $deleteCategoryId)
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($userId: Float!, $userData: userType!) {
    updateUser(userId: $userId, userData: $userData) {
      firstname
      id
      lastname
      phone
      email
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation Mutation($userId: Float!, $reservations: [ReservationType!]!) {
    createOrder(userId: $userId, reservations: $reservations) {
      id
      created_at
      status
      total_price
      user {
        email
        id
      }
    }
  }
`;
