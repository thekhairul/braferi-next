import { gql } from "graphql-request";
import { useQuery } from 'react-query';
import { getProducts } from '../services/products';


export default function Home() {
  const productQuery = gql`
    {
      products(first:${5}) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const {data, isLoading} = useQuery(['/products',productQuery], getProducts)
  return (
    <div className='container mx-auto'>
      {data ? JSON.stringify(data) : null}
      <p>Hello</p>
    </div>
  )
}
