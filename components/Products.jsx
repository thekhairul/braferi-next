import Loader from "@/components/Loader";
import Product from "@/components/Product";
import gqlClient from "@/services/gqlClient";
import { getProductsCollection } from "@/services/queries/productQueries";
import { flattenCollection } from "@/utils/index";
import { useQuery } from "react-query";

export default function Products() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(
    ["/products"],
    () => {
      return gqlClient
        .request(getProductsCollection, { filters: JSON.parse(localStorage.getItem("braferi:shopify:filters")) || [] })
        .then((res) => {
          return flattenCollection(res?.collection?.products?.edges || [], true);
        });
    },
    { refetchOnWindowFocus: false }
  );

  console.log("products", products);

  if (isLoading) return <Loader />;
  if (isError || !products?.length) return <Loader type="error" />;

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
