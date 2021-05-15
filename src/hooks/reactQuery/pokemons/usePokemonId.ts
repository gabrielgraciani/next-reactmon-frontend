import { useQuery, UseQueryResult } from 'react-query';
import { api } from 'services/api';
import { IPokemon } from 'interfaces/Pokemon';

interface IFetchPokemonProps {
  id: string | string[];
}

interface IUsePokemonIdProps {
  initialData: IPokemon;
  id: string | string[];
}

export async function fetchPokemon({
  id,
}: IFetchPokemonProps): Promise<IPokemon> {
  const { data } = await api.get(`/pokemons/${id}`);

  return data;
}

export function usePokemonId({
  initialData,
  id,
}: IUsePokemonIdProps): UseQueryResult<IPokemon, unknown> {
  return useQuery(['pokemon', id], () => fetchPokemon({ id }), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData,
  });
}
