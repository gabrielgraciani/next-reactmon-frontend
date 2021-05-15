import { useQuery, UseQueryResult } from 'react-query';
import { api } from 'services/api';
import { ICity } from 'interfaces/City';

interface IUseCitiesFeaturedProps {
  initialData: ICity[];
}

export async function fetchCitiesFeatured(): Promise<ICity[]> {
  const { data } = await api.get('/cities-featured');

  return data;
}

export function useCitiesFeatured({
  initialData,
}: IUseCitiesFeaturedProps): UseQueryResult<ICity[], unknown> {
  return useQuery('cities_featured', fetchCitiesFeatured, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData,
  });
}
