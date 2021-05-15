import { useQuery, UseQueryResult } from 'react-query';
import { api } from 'services/api';
import { IPokemon } from 'interfaces/Pokemon';

interface IUsePokemonsFeaturedProps {
  initialData: IPokemon[];
}

export async function fetchPokemonsFeatured(): Promise<IPokemon[]> {
  const { data } = await api.get('/pokemons-featured');

  return data;
}

export function usePokemonsFeatured({
  initialData,
}: IUsePokemonsFeaturedProps): UseQueryResult<IPokemon[], unknown> {
  return useQuery('pokemons_featured', fetchPokemonsFeatured, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData,
  });
}
