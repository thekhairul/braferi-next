import { gql } from "graphql-request";

export const createCartQuery = gql`
  mutation CreateCart {
    cartCreate {
      cart {
        checkoutUrl
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const getCartQuery = gql`
  query getCart ($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
      lines(first:100) {
        edges {
          node {
            id,
            quantity
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
                image {
                  url
                }
                priceV2 {
                  amount
                }
                quantityAvailable
              }
            }
          }
        }
      }
    }
  }
`;

export const addToCartQuery = gql`
  mutation AddToCart($cartId: ID!, $merchandiseId: ID!, $quantity: Int) {
    cartLinesAdd(cartId: $cartId, lines: [{ quantity: $quantity, merchandiseId: $merchandiseId }]) {
      cart {
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                  }
                  image {
                    url
                  }
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const updateCartQuery = gql`
  mutation UpdateCart($cartId: ID!, $lineId: ID!, $merchandiseId: ID!, $quantity: Int) {
    cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, quantity: $quantity, merchandiseId: $merchandiseId }]) {
      cart {
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                  }
                  image {
                    url
                  }
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const removeCartQuery = gql`
  mutation removeCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                  }
                  image {
                    url
                  }
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;