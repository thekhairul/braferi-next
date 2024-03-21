import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { TbCurrencyTaka } from "react-icons/tb";

const Modal = dynamic(() => import("@/components/Modal"), { ssr: false });
const ProductPreview = dynamic(() => import("@/components/ProductPreview"), { ssr: false });

function Product({ product }) {
  const [isQuickViewOpen, setQuickView] = useState(false);
  const closeQuickView = () => setQuickView(false);

  return (
    <div className="rounded-md overflow-hidden bg-white shadow-md mb-6 break-inside-avoid-column">
      <Link href={`products/${product.handle}`}>
        <img src={product.featuredImage.url} alt={product.title} />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-md text-dark py-2 mb-4">{product.title}</h3>
        <div className="flex gap-2 flex-wrap justify-between items-center">
          <p>
            <span className="text-accent text-xl font-bold inline-flex items-center">
              <TbCurrencyTaka />
              {~~product.variants[0].priceV2.amount}
            </span>
          </p>
          <button
            className="bg-accent hover:bg-accent-dark focus:outline-none text-white px-6 py-3 rounded-lg inline-flex justify-center items-center gap-2"
            onClick={() => setQuickView(true)}
          >
            <FiEye className="font-bold" />
            Quick View
          </button>
        </div>
      </div>

      <Modal appendTo="#modals" isOpen={isQuickViewOpen} closeModal={closeQuickView}>
        <div className="max-w-full md:max-w-6xl rounded-lg overflow-hidden shadow-md relative">
          <button
            onClick={closeQuickView}
            className="absolute z-50 top-0 right-0 w-10 h-10 inline-flex py-2 pl-4 rounded-bl-full shadow-xl bg-white text-dark"
          >
            <GrClose />
          </button>
          <ProductPreview product={product} />
        </div>
      </Modal>
    </div>
  );
}

export default Product;
