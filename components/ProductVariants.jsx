import { useEffect, useState } from "react";
import StyledVariantButton from "./styles/variantStyle";

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
    <div className="bg-white my-4 rounded-md shadow-md">
      {options.map((option) => (
        <div className="flex items-center border-b border-gray-200" key={option.id}>
          <h2 className="font-semibold p-4 uppercase">{option.name}:</h2>
          <div className="flex-grow inline-flex flex-wrap p-4 gap-2 overflow-hidden">
            {option.values.map((value) => (
              <StyledVariantButton
                isSelected={currentOptions[option.name] === value}
                color={option.name === "Color" ? value.split("#")[1] : null}
                title={option.name === "Color" ? value.split("#")[0] : value}
                key={value}
                onClick={() => changeOption(option.name, value)}
              >
                {value}
              </StyledVariantButton>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductVariants;
