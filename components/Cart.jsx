import Counter from "@/components/Counter";
import { TbCurrencyTaka, TbTrash } from "react-icons/tb";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((store) => store.cart);
  console.log(cart);
  return (
    <ul className="p-2">
      {cart.products.map((product) => (
        <li key={product.id} className="flex gap-2 mb-4">
          <img
            src={product.variant.image.url}
            alt=""
            className=" block w-20 flex-shrink-0 object-cover object-top rounded-md"
          />
          <div className="flex-grow">
            <h4 className="text-sm m-0 mb-1">{product.title}</h4>
            <p className="inline-flex items-center text-accent font-semibold">
              <TbCurrencyTaka />
              <span>{product.variant.priceV2.amount}</span>
            </p>
            <div className="my-2">
              <Counter max={product.variant.quantityAvailable} value={product.count} />
            </div>
          </div>
          <button className="self-start focus:outline-none text-md text-red-400 p-2 shadow-md rounded-md">
            <TbTrash />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Cart;
