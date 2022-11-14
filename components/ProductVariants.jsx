import { useEffect, useState } from "react";
import StyledVariant from "./styles/variantStyle";

function ProductVariants({ options, variants, onVariantSelect }) {
  const [currentOptions, setOptions] = useState(
    options.reduce((result, option) => {
      result[option.name] = option.values[0];
      return result;
    }, {})
  );

  useEffect(() => {
    const selectedVariant = variants.find((variant) =>
      variant.selectedOptions.every((option) => currentOptions[option.name] === option.value)
    );
    onVariantSelect(selectedVariant);
  }, [currentOptions]);

  const changeOption = (name, value) => {
    setOptions({ ...currentOptions, [name]: value });
  };

  return (
    <StyledVariant>
      {options.map((option) => (
        <div className="flex-1 border-r border-gray-200" key={option.id}>
          <h2 className="font-semibold p-4 border-b border-gray-200 uppercase">{option.name}:</h2>
          <div className="inline-flex flex-wrap p-4 gap-1 overflow-hidden">
            {option.values.map((value) => (
              <button
                className={`${currentOptions[option.name] === value ? "btn-variant--selected" : "btn-variant"}`}
                key={value}
                onClick={() => changeOption(option.name, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </StyledVariant>
  );
}

export default ProductVariants;
