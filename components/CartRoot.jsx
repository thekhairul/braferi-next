import Cart from "@/components/Cart";
import { createCart, getCart } from "@/services/cartApi";
import gqlClient from "@/services/gqlClient";
import { flattenCollection } from "@/utils/index";
import { gql } from "graphql-request";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";

const SidebarNoSSR = dynamic(() => import("@/components/Sidebar"), { ssr: false });
// TODO: abstract all queries
const getCartQuery = (cartId) => gql`
  {
    cart(
      id: "${cartId}"
    ) {
      checkoutUrl
      lines(first:100) {
        edges {
          node {
            id,
            quantity
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
                image {
                  url
                }
                priceV2 {
                  amount
                }
                quantityAvailable
              }
            }
          }
        }
      }
    }
  }
`;

const createAndStoreCart = () => {
  const mutationQuery = gql`
    mutation CreateCart {
      cartCreate {
        cart {
          checkoutUrl
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  return createCart(mutationQuery).then((res) => {
    const cart = res?.cartCreate?.cart;
    if (cart) {
      localStorage.setItem("braferi:shopify:cart", JSON.stringify(cart));
    }
    return cart?.id || null;
  });
};

const updateCartLine = (line) => {
  const { id: cartId } = JSON.parse(localStorage.getItem("braferi:shopify:cart"));
  const mutationQuery = gql`
    mutation UpdateCart($cartId: ID!, $lineId: ID!, $merchandiseId: ID!, $quantity: Int) {
      cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, quantity: $quantity, merchandiseId: $merchandiseId }]) {
        cart {
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                    }
                    image {
                      url
                    }
                    priceV2 {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return gqlClient.request(mutationQuery, {
    cartId,
    lineId: line.id,
    merchandiseId: line.merchandise.id,
    quantity: line.quantity,
  });
};

const removeCartLine = (lineId) => {
  const { id: cartId } = JSON.parse(localStorage.getItem("braferi:shopify:cart"));
  const mutationQuery = gql`
    mutation removeCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                    }
                    image {
                      url
                    }
                    priceV2 {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return gqlClient.request(mutationQuery, {
    cartId,
    lineIds: [lineId],
  });
};

function CartRoot() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [cartId, setCartId] = useState(null);
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: cartData,
  } = useQuery(
    ["cart"],
    () =>
      getCart(getCartQuery(cartId)).then((res) => {
        return {
          cart: flattenCollection(res?.cart?.lines?.edges || [], true),
          checkoutUrl: res?.cart?.checkoutUrl,
        };
      }),
    {
      keepPreviousData: true,
      enabled: Boolean(cartId),
    }
  );
  // TODO: make an utility hook for mutation
  const cartUpdateMutation = useMutation(updateCartLine, {
    onMutate: async (newLine) => {
      await queryClient.cancelQueries("cart");

      const previousCart = queryClient.getQueryData("cart");

      queryClient.setQueryData("cart", (old) => {
        const cart = old.cart.map((item) => {
          if (item.id === newLine.id) return newLine;
          return item;
        });
        return { ...old, cart };
      });

      return { previousCart };
    },
    onError: (err, newLine, context) => {
      queryClient.setQueryData("cart", context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries("cart");
    },
  });

  const cartRemoveMutation = useMutation(removeCartLine, {
    onMutate: async (lineId) => {
      await queryClient.cancelQueries("cart");

      const previousCart = queryClient.getQueryData("cart");

      queryClient.setQueryData("cart", (old) => {
        const cart = old.cart.filter((item) => item.id !== lineId);
        return { ...old, cart };
      });

      return { previousCart };
    },
    onError: (err, lineId, context) => {
      queryClient.setQueryData("cart", context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries("cart");
    },
  });

  const closeSidebar = () => setSidebarOpen(false);
  const handleCartUpdate = (line) => {
    cartUpdateMutation.mutate(line);
  };
  const handleCartRemove = (lineId) => {
    cartRemoveMutation.mutate(lineId);
  };

  useEffect(() => {
    if (localStorage.getItem("braferi:shopify:cart")) {
      const { id } = JSON.parse(localStorage.getItem("braferi:shopify:cart"));
      getCart(getCartQuery(id))
        .then((res) => {
          console.log("cart0", res);
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
      <button className="text-accent relative" onClick={() => setSidebarOpen(true)}>
        <BsFillCartFill className="text-3xl" />
        {cartData?.cart?.length ? (
          <span className="absolute -top-2 -right-1 inline-flex justify-center items-center w-5 h-5 bg-brand text-white rounded-full">
            {cartData?.cart?.length}
          </span>
        ) : null}
      </button>

      <SidebarNoSSR appendTo="#sidebars" isOpen={isSidebarOpen} closeSidebar={closeSidebar}>
        <Cart
          data={cartData?.cart}
          checkoutUrl={cartData?.checkoutUrl}
          updateCart={handleCartUpdate}
          removeCart={handleCartRemove}
        />
      </SidebarNoSSR>
    </>
  );
}

export default CartRoot;
