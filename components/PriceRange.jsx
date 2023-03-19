import { StyledPriceRangeBar, StyledPriceRangeInput } from "@/components/styles/priceRangeStyle";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

function PriceRange({ minPrice = 0, maxPrice = 10000, priceGapLimit = 500, onChange = () => {} }) {
  const [minPriceCurrent, setMinPriceCurrent] = useState(minPrice);
  const [maxPriceCurrent, setMaxPriceCurrent] = useState(maxPrice);
  const publishChange = useCallback(
    debounce((change) => onChange(change), 200),
    [onChange]
  );

  useEffect(() => {
    publishChange({ fromPrice: minPriceCurrent, toPrice: maxPriceCurrent });
  }, [minPriceCurrent, maxPriceCurrent, publishChange]);

  const priceRangeLeftGap = useMemo(() => {
    const gapPercentage = (minPriceCurrent * 100) / (maxPrice - minPrice);
    return `${gapPercentage}%`;
  }, [minPriceCurrent, minPrice, maxPrice]);

  const priceRangeRightGap = useMemo(() => {
    const gapPercentage = (maxPriceCurrent * 100) / (maxPrice - minPrice);
    return `${100 - gapPercentage}%`;
  }, [maxPriceCurrent, minPrice, maxPrice]);

  const handleMinPrice = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= maxPriceCurrent - priceGapLimit) setMinPriceCurrent(value);
  };

  const handleMaxPrice = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= minPriceCurrent + priceGapLimit) setMaxPriceCurrent(value);
  };

  return (
    <div className="pt-4 pb-6">
      <div className="flex justify-between items-center gap-4">
        <span className="inline-flex items-center">
          From: {minPriceCurrent} <TbCurrencyTaka />
        </span>
        <span className="inline-flex items-center">
          To: {maxPriceCurrent} <TbCurrencyTaka />
        </span>
      </div>
      <div className="relative my-2">
        <div className="absolute bg-gray-300 inset-0 h-1 rounded-md"></div>
        <StyledPriceRangeBar left={priceRangeLeftGap} right={priceRangeRightGap} />
        <StyledPriceRangeInput
          className="absolute inset-0 w-full h-1"
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minPriceCurrent}
          step="100"
          onInput={handleMinPrice}
        ></StyledPriceRangeInput>
        <StyledPriceRangeInput
          className="absolute inset-0 w-full h-1"
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxPriceCurrent}
          step="100"
          onInput={handleMaxPrice}
        ></StyledPriceRangeInput>
      </div>
    </div>
  );
}

export default PriceRange;
