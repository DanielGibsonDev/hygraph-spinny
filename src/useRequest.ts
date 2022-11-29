import {useQuery} from "react-query";
import {gql, GraphQLClient} from "graphql-request";

const API_URL =
    'https://api-ap-southeast-2.hygraph.com/v2/clb1msd7x0spy01une58afbl1/master';

const graphQLClient = new GraphQLClient(API_URL);

type Product = {
    id: string;
    name: string;
    description: string;
    price: string;
};

export const useGetProducts = () => {
    return useQuery<Product[]>('get-products', async () => {
        const {products} = await graphQLClient.request(gql`
            query {
                products {
                    id
                    name
                    description
                    price
                }
            }
        `);
        return products;
    });
}