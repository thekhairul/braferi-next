import Checkbox from "@/components/Checkbox";
import PriceRange from "@/components/PriceRange";
import Radio from "@/components/Radio";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

function Filter() {
  const [filters, setFilters] = useState({
    inStock: false,
    onSale: false,
  });

  const handleFilters = (prop, val) => {
    setFilters({ ...filters, [prop]: val });
  };

  return (
    <div className="w-full shadow-lg rounded-md p-4" style={{ minHeight: "400px" }}>
      <h3 className="flex items-center gap-2 border-b border-gray-200 py-2 mb-4">
        <FiFilter />
        <span>Filter</span>
      </h3>
      <div className="border-b border-gray-200">
        <h4 className="font-semibold uppercase mb-4">Price</h4>
        <PriceRange onChange={(val) => console.log(val)} />
      </div>
      <div className="py-4 border-b border-gray-200">
        <Checkbox className="w-full" checked={filters.inStock} onChange={(val) => handleFilters("inStock", val)}>
          In Stock
        </Checkbox>
        <Checkbox className="w-full" checked={filters.onSale} onChange={(val) => handleFilters("onSale", val)}>
          On Sale
        </Checkbox>
      </div>
      <div className="py-4 border-b border-gray-200">
        <h4 className="font-semibold uppercase mb-4">Brands</h4>
        <Radio name="brands" options={["Freya", "Lepel", "Curvy Kate", "Victorias Secret"]} />
      </div>
    </div>
  );
}

export default Filter;
