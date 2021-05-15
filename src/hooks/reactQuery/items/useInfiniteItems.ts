import {
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  InfiniteData,
} from 'react-query';

import { IItemsResponse } from 'interfaces/responses/ItemsResponse';

import { api } from 'services/api';

interface IFetchItemsProps {
  pageParam: number;
}

interface IUseInfiniteItemsProps {
  initialData: InfiniteData<IItemsResponse>;
}

export async function fetchItems({
  pageParam = 1,
}: IFetchItemsProps): Promise<IItemsResponse> {
  const { data } = await api.get(`/items?page=${pageParam}`);

  return data;
}

export function useInfiniteItems({
  initialData,
}: IUseInfiniteItemsProps): InfiniteQueryObserverResult<IItemsResponse> {
  return useInfiniteQuery(
    'items',
    async ({ pageParam = 1 }) => {
      const response = await fetchItems({ pageParam });

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
