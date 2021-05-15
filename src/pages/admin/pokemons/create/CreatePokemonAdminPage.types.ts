export interface ICreatePokemonFormData {
  name: string;
  weight: string;
  height: string;
  types: string | string[];
  weakness: string | string[];
  image: string;
}
