import {
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  InfiniteData,
} from 'react-query';

import { ICitiesResponse } from 'interfaces/responses/CitiesResponse';

import { api } from 'services/api';

interface IFetchCitiesProps {
  pageParam: number;
}

interface IUseInfiniteCitiesProps {
  initialData: InfiniteData<ICitiesResponse>;
}

export async function fetchCities({
  pageParam = 1,
}: IFetchCitiesProps): Promise<ICitiesResponse> {
  const { data } = await api.get(`/cities?page=${pageParam}`);

  return data;
}

export function useInfiniteCities({
  initialData,
}: IUseInfiniteCitiesProps): InfiniteQueryObserverResult<ICitiesResponse> {
  return useInfiniteQuery(
    'cities',
    async ({ pageParam = 1 }) => {
      const response = await fetchCities({ pageParam });

      return response;
    },
    {
      initialData,
      getNextPageParam: lastPage => {
        const totalRecords = lastPage.meta.total_records;
        const currentPage = lastPage.meta.current_page;
        const limit = 12;

        const endOffset = currentPage * limit;
        const hasNextPage = totalRecords > endOffset;

        if (!hasNextPage) {
          return undefined;
        }

        return lastPage.meta.current_page + 1;
      },
    },
  );
}
