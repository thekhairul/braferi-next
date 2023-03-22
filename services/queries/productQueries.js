import { gql } from "graphql-request";

export const getProductsQuery = gql`
  query productsQuery($query: String = "") {
    products(first: 100, query: $query) {
      edges {
        node {
          id
          handle
          title
          tags
          description
          options {
            id
            name
            values
          }
          variants(first: 20) {
            edges {
              node {
                id
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
                priceV2 {
                  amount
                }
                image {
                  id
                  url
                }
              }
            }
          }
          featuredImage {
            id
            url
          }
          images(first: 20) {
            edges {
              node {
                id
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const getFiltersQuery = gql`
  query getFilters($handle: String = "frontpage") {
    collection(handle: $handle) {
      products(first: 100) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
  }
`;

export const getProductsCollection = gql`
  query filterProducts($handle: String = "frontpage", $filters: [ProductFilter!] = [{}]) {
    collection(handle: $handle) {
      products(first: 100, filters: $filters) {
        edges {
          node {
            id
            handle
            title
            tags
            description
            options {
              id
              name
              values
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                  priceV2 {
                    amount
                  }
                  image {
                    id
                    url
                  }
                }
              }
            }
            featuredImage {
              id
              url
            }
            images(first: 20) {
              edges {
                node {
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;