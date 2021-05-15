import { useQuery, UseQueryResult } from 'react-query';

import { api } from 'services/api';
import { IPokemon } from 'interfaces/Pokemon';

export interface IPaginatedPokemonsResponse {
  totalCount: number;
  pokemons: IPokemon[];
}

interface IFetchPokemonsProps {
  page: number;
}

interface IUsePaginatedPokemonsProps {
  page: number;
  initialData: IPaginatedPokemonsResponse;
}

export async function fetchPokemons({
  page = 1,
}: IFetchPokemonsProps): Promise<IPaginatedPokemonsResponse> {
  const { data } = await api.get(`/pokemons?page=${page}`);

  return { pokemons: data.data, totalCount: data.meta.total_records };
}

export function usePaginatedPokemons({
  page,
  initialData,
}: IUsePaginatedPokemonsProps): UseQueryResult<
  IPaginatedPokemonsResponse,
  unknown
> {
  return useQuery(['pokemons_paginated', page], () => fetchPokemons({ page }), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    initialData,
    initialDataUpdatedAt: 1000 * 60 * 10, // 10 minutes
  });
}
