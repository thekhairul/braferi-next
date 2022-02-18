import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use((config) => {
    config.headers['X-Shopify-Storefront-Access-Token'] = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
    return config;
})

export default axiosClient;