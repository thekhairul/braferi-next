import { useState } from "react";
import { TbCurrencyTaka, TbHeart, TbShoppingCart } from "react-icons/tb";
import ProductGallery from "./ProductGallery";
import ProductVariants from "./ProductVariants";

function ProductPreview({ product }) {
  const [currentVariant, setCurrentVariant] = useState(null);

  return (
    <div className="bg-gray-100 flex flex-wrap max-h-full overflow-y-auto">
      <div className="w-full md:w-1/2">
        <ProductGallery images={product.images} goToImgId={currentVariant?.image?.id} />
      </div>
      <div className="w-full md:w-1/2 p-8">
        <h3 className="text-dark font-bold text-2xl mb-2">{product.title}</h3>
        <p className="mb-4">
          <span className="text-accent text-3xl font-bold inline-flex items-center">
            <TbCurrencyTaka />
            {~~(currentVariant || product.variants[0])?.priceV2.amount}
          </span>
        </p>
        <p className="text-dark mb-6 line-clamp-5">{product.description}</p>
        {product.options[0].name !== "Title" && (
          <ProductVariants options={product.options} variants={product.variants} onVariantSelect={setCurrentVariant} />
        )}

        <div className="flex justify-center mt-6">
          <button className="w-12 h-12 mr-2 text-2xl inline-flex justify-center items-center rounded-full text-accent bg-white shadow-lg hover:bg-accent hover:text-white">
            <TbHeart />
          </button>
          <div className="inline-flex bg-white p-2 rounded-l-full shadow-md">
            <button className="text-dark text-2xl px-2"> - </button>
            <input type="digit" className="flex-grow text-center w-6 focus:outline-none" placeholder="1" />
            <button className="text-dark text-2xl px-2"> + </button>
          </div>
          <button className="bg-accent text-white hover:bg-accent-dark border-l px-3 font-semibold rounded-r-full inline-flex items-center justify-center gap-2 shadow-md">
            <TbShoppingCart className="text-2xl" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
