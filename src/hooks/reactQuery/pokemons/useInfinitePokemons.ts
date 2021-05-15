import {
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  InfiniteData,
} from 'react-query';

import { IPokemonsResponse } from 'interfaces/responses/PokemonsResponse';

import { api } from 'services/api';

interface IFetchPokemonsProps {
  pageParam: number;
}

interface IUseInfinitePokemonsProps {
  initialData: InfiniteData<IPokemonsResponse>;
}

export async function fetchPokemons({
  pageParam = 1,
}: IFetchPokemonsProps): Promise<IPokemonsResponse> {
  const { data } = await api.get(`/pokemons?page=${pageParam}`);

  return data;
}

export function useInfinitePokemons({
  initialData,
}: IUseInfinitePokemonsProps): InfiniteQueryObserverResult<IPokemonsResponse> {
  return useInfiniteQuery(
    'pokemons',
    async ({ pageParam = 1 }) => {
      const response = await fetchPokemons({ pageParam });

      return response;
    },
    {
      initialData,
      getNextPageParam: lastPage => {
        const totalRecords = lastPage.meta.total_records;
        const currentPage = lastPage.meta.current_page;
        const limit = 12;

        const endOffset = currentPage * limit;
        const hasNextPage = totalRecords > endOffset;

        if (!hasNextPage) {
          return undefined;
        }

        return lastPage.meta.current_page + 1;
      },
    },
  );
}
