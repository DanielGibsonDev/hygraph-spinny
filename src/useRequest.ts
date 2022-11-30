import {useQuery} from "react-query";
import {gql, GraphQLClient} from "graphql-request";

const API_URL =
  'https://api-ap-southeast-2.hygraph.com/v2/clb1msd7x0spy01une58afbl1/master';

const graphQLClient = new GraphQLClient(API_URL);

type Name = {
  id: string;
  name: string;
  comment?: string;
};

export const useGetNames = () => {
  return useQuery<Name[]>('get-names', async () => {
    const {names} = await graphQLClient.request(gql`
            query {
                names {
                    id
                    name
                    comment
                }
            }
        `);
    return names;
  });
}