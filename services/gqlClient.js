import { GraphQLClient } from 'graphql-request';

const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
    },
});

export default gqlClient;