import { StyledPriceRangeBar, StyledPriceRangeInput } from "@/components/styles/priceRangeStyle";
import { useMemo } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

function PriceRange({ min = 0, max = 10000, minCurrent, maxCurrent, priceGapLimit = 500, onChange = () => {} }) {
  const priceRangeLeftGap = useMemo(() => {
    const gapPercentage = (minCurrent * 100) / (max - min);
    return `${gapPercentage}%`;
  }, [minCurrent, min, max]);

  const priceRangeRightGap = useMemo(() => {
    const gapPercentage = (maxCurrent * 100) / (max - min);
    return `${100 - gapPercentage}%`;
  }, [maxCurrent, min, max]);

  const handleMinPrice = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= maxCurrent - priceGapLimit) onChange({ min: value, max: maxCurrent });
  };

  const handleMaxPrice = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= minCurrent + priceGapLimit) onChange({ min: minCurrent, max: value });
  };

  return (
    <div className="pt-4 pb-6">
      <div className="flex justify-between items-center gap-4">
        <span className="inline-flex items-center">
          From: {minCurrent} <TbCurrencyTaka />
        </span>
        <span className="inline-flex items-center">
          To: {maxCurrent} <TbCurrencyTaka />
        </span>
      </div>
      <div className="relative my-2">
        <div className="absolute bg-gray-300 inset-0 h-1 rounded-md"></div>
        <StyledPriceRangeBar left={priceRangeLeftGap} right={priceRangeRightGap} />
        <StyledPriceRangeInput
          className="absolute inset-0 w-full h-1"
          type="range"
          min={min}
          max={max}
          value={minCurrent}
          step="100"
          onInput={handleMinPrice}
        ></StyledPriceRangeInput>
        <StyledPriceRangeInput
          className="absolute inset-0 w-full h-1"
          type="range"
          min={min}
          max={max}
          value={maxCurrent}
          step="100"
          onInput={handleMaxPrice}
        ></StyledPriceRangeInput>
      </div>
    </div>
  );
}

export default PriceRange;
