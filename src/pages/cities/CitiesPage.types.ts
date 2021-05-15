import { InfiniteData } from 'react-query';

import { ICitiesResponse } from 'interfaces/responses/CitiesResponse';

export interface ICitiesPageProps {
  citiesProps: InfiniteData<ICitiesResponse>;
}
