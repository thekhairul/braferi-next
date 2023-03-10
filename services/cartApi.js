import gqlClient from "./gqlClient";

export const createCart = function (query) {
    return gqlClient.request(query);
}

export const getCart = function (query) {
    return gqlClient.request(query);
}