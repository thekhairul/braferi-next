import Filter from "@/components/Filter";
import Products from "@/components/Products";
import gqlClient from "@/services/gqlClient";
import { getProductsCollection } from "@/services/queries/productQueries";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const isMobileScreen = window.matchMedia("(max-width: 767.99px)").matches;
    setIsMobile(isMobileScreen);
  }, []);

  return (
    <div id="home" className="container mx-auto flex gap-4 py-6">
      {!isMobile && (
        <div className="w-0 md:w-2/5 lg:w-2/6 xl:w-1/4 relative">
          <Filter />
        </div>
      )}
      <div className="w-full md:w-3/5 lg:w-4/6 xl:w-3/4">
        <Products initialData={props.productsData} />
      </div>
    </div>
  );
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
