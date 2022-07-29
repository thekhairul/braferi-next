import Modal from "@/components/Modal";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

function Product({ product }) {
  const [isQuickViewOpen, setQuickView] = useState(false);
  const closeQuickView = () => setQuickView(false);

  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-md mb-6 break-inside-avoid">
      <img src={product.featuredImage.url} alt={product.title} />
      <div className="p-4">
        <h3 className="font-semibold text-md text-gray-700 py-2 mb-4">{product.title}</h3>
        <div className="flex justify-between items-center">
          <p>
            <span className="text-violet-600 font-bold inline-flex items-center">
              <TbCurrencyTaka />
              {~~product.variants[0].priceV2.amount}
            </span>
          </p>
          <button
            className="bg-violet-600 hover:bg-violet-800 text-white font-bold px-6 py-3 rounded-full"
            onClick={() => setQuickView(true)}
          >
            Quick View
          </button>
        </div>
      </div>

      <Modal appendTo="#modals" isOpen={isQuickViewOpen} closeModal={closeQuickView}>
        hi
      </Modal>
    </div>
  );
}

export default Product;
