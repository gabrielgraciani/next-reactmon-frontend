import { IPokemon } from 'interfaces/Pokemon';

export interface IPokemonPageProps {
  pokemonProps: IPokemon;
  id: string;
}

export interface IPokemonStyledProps {
  type: string;
}
