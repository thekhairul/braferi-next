// create and export product api call functions with axios
// import axios
import axiosClient from "./axiosClient";
// export const getProducts()
export const getProducts = function({queryKey}) {
    const headers = {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '5e75857faac13ffb8ea42b46fad4ca69'
    }
    const query = `
        {
            products(first:5) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `;
    return axiosClient.post('/',{title: 'inception', data: {query}}).then(res => res.json()).catch(err => err)
    // request('https://braferri.myshopify.com/api/2022-01/graphql.json', query, {title: 'inception'}, {headers}).then((data) => console.log(data))
}
// export const getProduct(productId)