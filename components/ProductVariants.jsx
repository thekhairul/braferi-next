import { useEffect, useState } from "react";

function ProductVariants({options, variants, onVariantSelect}) {
    const [currentOptions, setOptions] = useState(options.reduce((result, option) => {
        result[option.name] = option.values[0];
        return result;
    }, {}));

    useEffect(() => {
        const selectedVariant = variants.find(variant => variant.selectedOptions.every(option => currentOptions[option.name] === option.value));
        onVariantSelect(selectedVariant);
    }, [currentOptions]);

    const changeOption = (name, value) => {
        setOptions({...currentOptions, [name]: value})
    }

    return ( <div>
        {options.map(option => (
            <div key={option.id}>
                <h2>{option.name}</h2>
                {option.values.map(value => (
                    <button key={value} onClick={() => changeOption(option.name, value)}>{value}</button>
                ))}
            </div>
        ))}
    </div> );
}

export default ProductVariants;