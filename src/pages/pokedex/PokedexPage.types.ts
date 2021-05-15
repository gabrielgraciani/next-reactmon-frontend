import { InfiniteData } from 'react-query';

import { IPokemonsResponse } from 'interfaces/responses/PokemonsResponse';

export interface IPokedexPageProps {
  pokemonsProps: InfiniteData<IPokemonsResponse>;
}
