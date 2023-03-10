import gqlClient from "./gqlClient";

export const getProducts = function(query) {
    return gqlClient.request(query)
}

// export const getProduct(productId)