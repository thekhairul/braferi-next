import Cart from "@/components/Cart";
import { useRQmutation } from "@/hooks/RQmutation";
import gqlClient from "@/services/gqlClient";
import { createCartQuery, getCartQuery, removeCartQuery, updateCartQuery } from "@/services/queries/cartQueries";
import { flattenCollection } from "@/utils/index";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { useQuery } from "react-query";

const SidebarNoSSR = dynamic(() => import("@/components/Sidebar"), { ssr: false });

const createAndStoreCart = () => {
  return gqlClient.request(createCartQuery).then((res) => {
    const cart = res?.cartCreate?.cart;
    if (cart) {
      localStorage.setItem("braferi:shopify:cart", JSON.stringify(cart));
    }
    return cart?.id || null;
  });
};

const updateCartLine = (line) => {
  const { id: cartId } = JSON.parse(localStorage.getItem("braferi:shopify:cart"));
  return gqlClient.request(updateCartQuery, {
    cartId,
    lineId: line.id,
    merchandiseId: line.merchandise.id,
    quantity: line.quantity,
  });
};

const removeCartLine = (lineId) => {
  const { id: cartId } = JSON.parse(localStorage.getItem("braferi:shopify:cart"));
  return gqlClient.request(removeCartQuery, {
    cartId,
    lineIds: [lineId],
  });
};

function CartRoot() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartId, setCartId] = useState(null);
  const {
    isLoading,
    error,
    data: cartData,
  } = useQuery(
    ["cart"],
    () =>
      gqlClient.request(getCartQuery, { cartId }).then((res) => {
        return {
          cart: flattenCollection(res?.cart?.lines?.edges || [], true),
          checkoutUrl: res?.cart?.checkoutUrl,
        };
      }),
    {
      keepPreviousData: true,
      enabled: Boolean(cartId),
      refetchOnWindowFocus: false,
    }
  );

  const cartUpdateMutation = useRQmutation("cart", updateCartLine, (oldData, newData) => {
    const cart = oldData.cart.map((item) => {
      if (item.id === newData.id) return newData;
      return item;
    });
    return { ...oldData, cart };
  });

  const cartRemoveMutation = useRQmutation("cart", removeCartLine, (oldData, lineId) => {
    const cart = oldData.cart.filter((item) => item.id !== lineId);
    return { ...oldData, cart };
  });

  const handleCartUpdate = (line) => {
    cartUpdateMutation.mutate(line);
  };
  const handleCartRemove = (lineId) => {
    cartRemoveMutation.mutate(lineId);
  };

  const closeSidebar = () => setCartOpen(false);

  useEffect(() => {
    if (localStorage.getItem("braferi:shopify:cart")) {
      const { id } = JSON.parse(localStorage.getItem("braferi:shopify:cart"));
      gqlClient
        .request(getCartQuery, { cartId: id })
        .then((res) => {
          setCartId(id);
        })
        .catch((err) => {
          createAndStoreCart().then((id) => setCartId(id));
        });
    } else {
      createAndStoreCart().then((id) => setCartId(id));
    }
  }, []);

  return (
    <>
      <button className="text-accent relative p-2 hover:shadow-lg rounded-lg" onClick={() => setCartOpen(true)}>
        <BsHandbag className="text-3xl" />
        {cartData?.cart?.length ? (
          <span className="absolute -top-0 -right-1 inline-flex justify-center items-center w-5 h-5 bg-brand text-white font-semibold shadow-md rounded-full">
            {cartData?.cart?.length}
          </span>
        ) : null}
      </button>

      {isCartOpen && (
        <SidebarNoSSR appendTo="#sidebars" isOpen={isCartOpen} closeSidebar={closeSidebar}>
          <Cart
            data={cartData?.cart}
            checkoutUrl={cartData?.checkoutUrl}
            updateCart={handleCartUpdate}
            removeCart={handleCartRemove}
          />
        </SidebarNoSSR>
      )}
    </>
  );
}

export default CartRoot;
