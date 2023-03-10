import Counter from "@/components/Counter";
import { useMemo } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { TbCurrencyTaka, TbTrash } from "react-icons/tb";

function Cart({ data, checkoutUrl, updateCart, removeCart }) {
  console.log("cartData", data, checkoutUrl);

  const cartPrice = useMemo(() => {
    if (!data) return 0;
    return data.reduce((total, currentProduct) => {
      total += currentProduct.merchandise.priceV2.amount * currentProduct.quantity;
      return total;
    }, 0);
  }, [data]);

  if (!data) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2 className="p-2 border-b border-gray-200 text-2xl mb-4">Cart</h2>
      <ul className="p-2">
        {data.map(({ merchandise, ...product }) => (
          <li key={merchandise.id} className="flex gap-2 mb-4">
            <img
              src={merchandise.image.url}
              alt=""
              className=" block w-20 flex-shrink-0 object-cover object-top rounded-md"
            />
            <div className="flex-grow">
              <h4 className="text-sm m-0 mb-1">{merchandise.product.title}</h4>
              <p className="inline-flex items-center text-accent font-semibold">
                <TbCurrencyTaka />
                <span>{merchandise.priceV2.amount}</span>
              </p>
              <div className="my-2">
                <Counter
                  max={merchandise.quantityAvailable}
                  value={product.quantity}
                  onCountChange={(count) => updateCart({ merchandise, ...product, quantity: count })}
                />
              </div>
            </div>
            <button
              className="self-start focus:outline-none text-md text-red-400 p-2 shadow-md rounded-md"
              onClick={() => removeCart(product.id)}
            >
              <TbTrash />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between items-center gap-2 p-2 border-t border-gray-200">
        <p className="text-lg inline-flex items-center">
          Total: <TbCurrencyTaka /> {cartPrice}
        </p>
        {cartPrice ? (
          <a
            href={checkoutUrl}
            className="bg-accent hover:bg-accent-dark focus:outline-none text-white px-6 py-3 rounded-full inline-flex justify-center items-center gap-2"
            rel="noreferrer"
          >
            <BsFillBagCheckFill /> Checkout
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default Cart;
