import gqlClient from "@/services/gqlClient";
import { getProductsQuery } from "@/services/queries/productQueries";
import { debounce } from "lodash";
import { useCallback } from "react";
import { TbSearch } from "react-icons/tb";
import { useQueryClient } from "react-query";

function SearchBar() {
  const queryClient = useQueryClient();

  const handleSearch = useCallback(
    debounce((e) => {
      const { value } = e.target;
      const query = ["title", "tag", "product_type", "vendor"].map((category) => {
        return `(${category}:${value}*)`;
      });
      gqlClient.request(getProductsQuery, { query: value.trim() ? query.join(" OR ") : "" }).then((res) => {
        queryClient.setQueryData(["/products"], { pages: [res?.products] });
      });
    }, 500),
    []
  );

  return (
    <div className="flex-grow flex justify-center">
      <div className="lg:w-96 inline-flex items-center gap-1">
        <TbSearch className="text-xl text-gray-500" />
        <input
          type="search"
          placeholder="Search..."
          className="p-2 pl-0 w-full border-b border-gray-200 focus:outline-none focus:border-accent"
          onInput={handleSearch}
          onKeyUp={(e) => e.key === "Enter" && handleSearch(e)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
