import { BsCartPlus } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";

function ProductPreview({product}) {
    return (
        <div className="bg-white flex flex-wrap">
            <div className="w-full md:w-2/5 p-4">
                <img src={product.featuredImage.url} alt={product.title} className="rounded-3xl shadow-lg"/>
            </div>
            <div className="w-full md:w-3/5 p-4">
                <h3 className="text-dark font-semibold text-lg mb-2">{product.title}</h3>
                <p className='mb-4'>
                    <span className="text-accent font-bold inline-flex items-center">
                    <TbCurrencyTaka />
                    {~~product.variants[0].priceV2.amount}
                    </span>
                </p>
                <p className='text-dark mb-6'>{product.description}</p>
                <button
                    className="bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2"
                >
                    <BsCartPlus />
                    Add To Cart
                </button>
            </div>
        </div>
    );
}

export default ProductPreview;