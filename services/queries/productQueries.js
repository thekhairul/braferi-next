import { gql } from "graphql-request";
// search products
export const getProductsQuery = gql`
  query productsQuery($query: String = "") {
    products(first: 100, query: $query) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
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
// filter products
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
// products collection
export const getProductsCollection = gql`
  query filterProducts($handle: String = "frontpage", $filters: [ProductFilter!] = [{}], $cursor: String) {
    collection(handle: $handle) {
      products(first: 5, filters: $filters, after: $cursor) {
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
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
// single product
export const getProductByHandle = gql`
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
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
`;