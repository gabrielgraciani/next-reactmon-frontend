import { IPokemon } from 'interfaces/Pokemon';
import { IItem } from 'interfaces/Item';
import { ICity } from 'interfaces/City';

export interface IHomePageProps {
  pokemonsFeaturedProps: IPokemon[];
  itemsFeaturedProps: IItem[];
  citiesFeaturedProps: ICity[];
}
