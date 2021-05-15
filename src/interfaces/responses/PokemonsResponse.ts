import { IPokemon } from '../Pokemon';

export interface IPokemonsResponse {
  data: IPokemon[];
  meta: {
    total_records: number;
    total_pages: number;
    has_next_page: boolean;
    current_page: number;
  };
}
