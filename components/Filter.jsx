import Checkbox from "@/components/Checkbox";
import Loader from "@/components/Loader";
import PriceRange from "@/components/PriceRange";
import Radio from "@/components/Radio";
import gqlClient from "@/services/gqlClient";
import { getFiltersQuery } from "@/services/queries/productQueries";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiFilter } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";
import { useQuery } from "react-query";

function Filter({ initialData }) {
  const router = useRouter();
  const filtersFromURL = router.query.filters;
  const [cumulatedFilters, setCumulatedFilters] = useState({});
  const [filters, setFilters] = useState([]);
  const hasUsedFilters = useRef(false);
  const {
    data: filterList,
    isLoading,
    isFetching,
    isError,
  } = useQuery(
    ["/filters"],
    () => {
      return gqlClient.request(getFiltersQuery).then((res) => {
        return res?.collection?.products?.filters;
      });
    },
    {
      refetchOnWindowFocus: false,
      initialData,
      select: (data) => {
        if (!data) return {};
        return data.reduce((set, filter) => {
          set[filter.label] = filter.values.map(({ label, input, count }) => ({ label, input, count, value: label }));
          return set;
        }, {});
      },
    }
  );

  useEffect(() => {
    let parsedFilters = filters;
    if (filters.length) hasUsedFilters.current = true;
    if (filtersFromURL && !hasUsedFilters.current) parsedFilters = JSON.parse(filtersFromURL);
    setCumulatedFilters(parsedFilters.reduce((set, filter) => ({ ...set, ...filter }), {}));
  }, [filtersFromURL, filters]);

  const filterProducts = (filterInputs) => {
    const { pathname, query } = router;
    if (!filterInputs.length) {
      delete router.query.filters;
      router.replace({ pathname, query }, undefined, { shallow: true });
      setFilters([]);
    } else {
      router.replace({ pathname, query: { ...query, filters: JSON.stringify(filterInputs) } });
    }
  };

  const handleFilters = (key, filterInput) => {
    setFilters((filters) => {
      const restOfItems = filters.filter((item) => !Object.keys(item).includes(key));
      if (filterInput) restOfItems.push({ [key]: filterInput });
      return restOfItems;
    });
  };

  const parsedPrice = useMemo(() => {
    if (filterList?.Price) {
      const priceInput = filterList.Price[0].input;
      const price = JSON.parse(priceInput).price;
      return { min: price.min, max: price.max };
    }
    return {};
  }, [filterList]);

  if (isLoading) return <Loader />;
  if (isError || !Object.keys(filterList || {}).length) return <Loader type="error" />;

  return (
    <div className="w-full bg-white shadow-lg rounded-md p-4" style={{ minHeight: "400px" }}>
      <div className="flex items-center gap-2 border-b border-gray-200 py-2 mb-4">
        <h3 className="flex-grow inline-flex items-center gap-2">
          <FiFilter />
          <span>Filter</span>
        </h3>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg"
          disabled={!Object.keys(cumulatedFilters).length}
          onClick={() => filterProducts([])}
        >
          <TbTrash />
          <span>Clear</span>
        </button>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg"
          onClick={() => filterProducts(filters)}
        >
          <FiCheck />
          <span>Apply</span>
        </button>
      </div>
      {filterList.Price && (
        <div className="border-b border-gray-200">
          <h4 className="font-semibold uppercase mb-4">Price</h4>
          <PriceRange
            min={parsedPrice.min}
            max={parsedPrice.max}
            minCurrent={cumulatedFilters.price?.min || parsedPrice.min}
            maxCurrent={cumulatedFilters.price?.max || parsedPrice.max}
            onChange={({ min, max }) => handleFilters("price", { min, max })}
          />
        </div>
      )}
      <div className="py-4 border-b border-gray-200">
        <Checkbox
          className="w-full"
          value={cumulatedFilters.available}
          onChange={(isChecked) => handleFilters("available", isChecked)}
        >
          In Stock
        </Checkbox>
        <Checkbox className="w-full" onChange={(val) => {}}>
          On Sale
        </Checkbox>
      </div>
      {filterList.Brand && (
        <div className="py-4 border-b border-gray-200">
          <h4 className="font-semibold uppercase mb-4">Brands</h4>
          <Radio
            name="brands"
            variant="box"
            options={filterList.Brand}
            selected={cumulatedFilters.productVendor}
            onChange={(brand) => handleFilters("productVendor", brand)}
          />
        </div>
      )}
      {filterList["Product type"] && (
        <div className="py-4 border-b border-gray-200">
          <h4 className="font-semibold uppercase mb-4">Product Type</h4>
          <Radio
            name="productType"
            options={filterList["Product type"]}
            selected={cumulatedFilters.productType}
            onChange={(type) => handleFilters("productType", type)}
          />
        </div>
      )}
      {filterList.Size && (
        <div className="py-4 border-b border-gray-200">
          <h4 className="font-semibold uppercase mb-4">Size</h4>
          <Radio
            name="size"
            variant="circle"
            options={filterList.Size}
            selected={cumulatedFilters.variantOption?.value}
            onChange={(value) => handleFilters("variantOption", (value && { name: "size", value }) || null)}
          />
        </div>
      )}
      {filterList["More filters"] && (
        <div className="py-4 border-opacity-100">
          <h4 className="font-semibold uppercase mb-4">More Filters</h4>
          <Radio
            name="tag"
            variant="box"
            options={filterList["More filters"]}
            selected={cumulatedFilters.tag}
            onChange={(tag) => handleFilters("tag", tag)}
          />
        </div>
      )}
    </div>
  );
}

export default Filter;
