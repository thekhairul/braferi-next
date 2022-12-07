import { getProducts } from "@/services/productsApi";
import { flattenCollection } from "@/utils/index";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import Product from "./Product";

export default function Products() {
  const productQuery = gql`
    {
      products(first: 5) {
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
  const { data, isLoading } = useQuery(
    ["/products", productQuery],
    getProducts
  );
  let products = [];
  if (data) products = flattenCollection(data.products.edges, true);
  console.log(products);

  return (
    <div className="container mx-auto">
      {isLoading ? <p>Hello</p> : null}
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 py-6">
        {products.map(product => <Product key={product.id} product={product}/>)}
      </div>
    </div>
  );
}
