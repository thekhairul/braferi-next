import Modal from "@/components/Modal";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { TbCurrencyTaka } from "react-icons/tb";
import ProductPreview from "./ProductPreview";

function Product({ product }) {
  const [isQuickViewOpen, setQuickView] = useState(false);
  const closeQuickView = () => setQuickView(false);

  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-md mb-6 break-inside-avoid">
      <img src={product.featuredImage.url} alt={product.title} />
      <div className="p-4">
        <h3 className="font-semibold text-md text-dark py-2 mb-4">{product.title}</h3>
        <div className="flex justify-between items-center">
          <p>
            <span className="text-accent font-bold inline-flex items-center">
              <TbCurrencyTaka />
              {~~product.variants[0].priceV2.amount}
            </span>
          </p>
          <button
            className="bg-accent hover:bg-accent-dark focus:outline-none text-white font-bold px-6 py-3 rounded-full"
            onClick={() => setQuickView(true)}
          >
            Quick View
          </button>
        </div>
      </div>

      <Modal appendTo="#modals" isOpen={isQuickViewOpen} closeModal={closeQuickView}>
        <div className="max-w-4xl rounded-3xl overflow-hidden shadow-md relative">
          <button onClick={closeQuickView} className="absolute top-0 right-0 p-4 rounded-full shadow-xl text-dark"><GrClose /></button>
          <ProductPreview product={product}/>
        </div>
      </Modal>
    </div>
  );
}

export default Product;
