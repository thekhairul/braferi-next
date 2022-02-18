// create and export product api call functions with axios

import gqlClient from "./gqlClient";

export const getProducts = function({queryKey}) {
    const [_key,query] = queryKey;
    return gqlClient.request(query)
}
// export const getProduct(productId)