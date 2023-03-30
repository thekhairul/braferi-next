import Filter from "@/components/Filter";
import Products from "@/components/Products";
import gqlClient from "@/services/gqlClient";
import { getProductsCollection } from "@/services/queries/productQueries";

export default function Home(props) {
  return (
    <div id="home" className="container mx-auto flex gap-4 py-6">
      <div className="w-1/4">
        <Filter />
      </div>
      <div className="w-3/4">
        <Products initialData={props.productsData} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const products = await gqlClient.request(getProductsCollection, {
        cursor: null,
        filters: [],
    }).then((res) => res.collection.products);
    return {props: {productsData: {pages: [products]}}}
  } catch (error) {
    console.log(error);
    return {props: {products: null}}
  }
}
