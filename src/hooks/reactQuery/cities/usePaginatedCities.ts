import { useQuery, UseQueryResult } from 'react-query';

import { api } from 'services/api';
import { ICity } from 'interfaces/City';

export interface IPaginatedCitiesResponse {
  totalCount: number;
  cities: ICity[];
}

interface IFetchCitiesProps {
  page: number;
}

interface IUsePaginatedCitiesProps {
  page: number;
  initialData: IPaginatedCitiesResponse;
}

export async function fetchCities({
  page = 1,
}: IFetchCitiesProps): Promise<IPaginatedCitiesResponse> {
  const { data } = await api.get(`/cities?page=${page}`);

  return { cities: data.data, totalCount: data.meta.total_records };
}

export function usePaginatedCities({
  page,
  initialData,
}: IUsePaginatedCitiesProps): UseQueryResult<
  IPaginatedCitiesResponse,
  unknown
> {
  return useQuery(['cities_paginated', page], () => fetchCities({ page }), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    initialData,
    initialDataUpdatedAt: 1000 * 60 * 10, // 10 minutes
  });
}
