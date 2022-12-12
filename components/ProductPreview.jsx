import { addToCart } from "@/store/cartSlice";
import { useRef, useState } from "react";
import { TbCurrencyTaka, TbHeart, TbShoppingCart } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Counter from "./Counter";
import ProductGallery from "./ProductGallery";
import ProductVariants from "./ProductVariants";

function ProductPreview({ product }) {
  const [currentVariant, setCurrentVariant] = useState(null);
  const productCount = useRef(0);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        variant: currentVariant || product.variants[0],
        count: productCount.current,
      })
    );
  };

  const handleProductCount = (count) => {
    productCount.current = count;
  };

  return (
    <div className="bg-gray-100 flex flex-wrap max-h-full overflow-y-auto">
      <div className="w-full md:w-1/2">
        <ProductGallery images={product.images} goToImgId={currentVariant?.image?.id} />
      </div>
      <div className="w-full md:w-1/2 p-4 md:p-8">
        <h3 className="text-dark font-bold text-2xl mb-2">{product.title}</h3>
        <p className="flex items-center gap-4 mb-4">
          <span className="text-accent text-3xl font-bold inline-flex items-center">
            <TbCurrencyTaka />
            {~~(currentVariant || product.variants[0])?.priceV2.amount}
          </span>
          {currentVariant?.quantityAvailable && (
            <span className="font-heading font-semibold">
              <b className="text-accent text-xl font-black px-4 py-1 mx-2 rounded-md shadow-md bg-white">
                {currentVariant.quantityAvailable}
              </b>
              <i>in stock</i>
            </span>
          )}
        </p>
        <p className="text-dark mb-6 line-clamp-5">{product.description}</p>
        {product.options[0].name !== "Title" && (
          <ProductVariants options={product.options} variants={product.variants} onVariantSelect={setCurrentVariant} />
        )}

        <div className="flex justify-center mt-6">
          <button className="w-12 h-12 mr-2 text-2xl inline-flex justify-center items-center rounded-full text-accent bg-white shadow-lg hover:bg-accent hover:text-white">
            <TbHeart />
          </button>
          <Counter
            className="bg-white p-2 rounded-l-full shadow-md"
            max={currentVariant?.quantityAvailable || 10}
            onCountChange={handleProductCount}
          />
          <button
            onClick={handleAddToCart}
            className="bg-accent text-white hover:bg-accent-dark border-l px-3 font-semibold rounded-r-full inline-flex items-center justify-center gap-2 shadow-md"
          >
            <TbShoppingCart className="text-2xl" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
