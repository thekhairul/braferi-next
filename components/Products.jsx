import InfiniteLoader from "@/components/InfiniteLoader";
import Loader from "@/components/Loader";
import Product from "@/components/Product";
import gqlClient from "@/services/gqlClient";
import { getProductsCollection } from "@/services/queries/productQueries";
import { flattenCollection } from "@/utils/index";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

export default function Products({ initialData }) {
  const { query } = useRouter();
  const {
    data: products,
    isLoading,
    remove,
    refetch,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery(
    ["/products"],
    ({ pageParam: cursor = null }) => {
      return gqlClient
        .request(getProductsCollection, {
          cursor,
          filters: JSON.parse(query.filters || "[]"),
        })
        .then((res) => res.collection.products);
    },
    {
      initialData,
      enabled: !!query,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (lastPage?.pageInfo?.hasNextPage) return lastPage.pageInfo.endCursor;
        return null;
      },
      select: (data) => {
        const pages = data.pages.reduce((set, currentPage) => {
          return set.concat(flattenCollection(currentPage?.edges || [], true));
        }, []);
        return {
          pages,
          pageParams: [null],
        };
      },
    }
  );

  useEffect(() => {
    remove();
    refetch();
  }, [query.filters]);

  if (isLoading) return <Loader />;
  if (isError || !products?.pages?.length) return <Loader type="error" />;

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {products && products.pages.map((product) => <Product key={product.id} product={product} />)}
      <InfiniteLoader onIntersect={() => hasNextPage && fetchNextPage()} />
    </div>
  );
}
