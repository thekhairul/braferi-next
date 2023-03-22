import gqlClient from "@/services/gqlClient";
import { getProductsCollection } from "@/services/queries/productQueries";
import { flattenCollection } from "@/utils/index";
import { useQuery } from "react-query";
import Product from "./Product";

export default function Products() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["/products"], () =>
    gqlClient
      .request(getProductsCollection, { filters: JSON.parse(localStorage.getItem("braferi:shopify:filters")) || [] })
      .then((res) => {
        return flattenCollection(res?.collection?.products?.edges || [], true);
      })
  );
  
  console.log("products", products);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed!</p>;

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
