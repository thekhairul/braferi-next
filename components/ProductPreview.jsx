import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import ProductGallery from "./ProductGallery";
import ProductVariants from "./ProductVariants";

function ProductPreview({ product }) {
  const [currentVariant, setCurrentVariant] = useState(null);

  return (
    <div className="bg-white flex flex-wrap">
      <div className="w-full md:w-1/2 p-4">
        <ProductGallery images={product.images} goToImgId={currentVariant?.image?.id} />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-dark font-semibold text-lg mb-2">{product.title}</h3>
        <p className="mb-4">
          <span className="text-accent font-bold inline-flex items-center">
            <TbCurrencyTaka />
            {~~(currentVariant || product.variants[0])?.priceV2.amount}
          </span>
        </p>
        <p className="text-dark mb-6">{product.description}</p>
        {product.options[0].name !== "Title" && (
          <ProductVariants options={product.options} variants={product.variants} onVariantSelect={setCurrentVariant} />
        )}

        <button className="bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2">
          <BsCartPlus />
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductPreview;
