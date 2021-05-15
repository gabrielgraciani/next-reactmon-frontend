import { useQuery, UseQueryResult } from 'react-query';
import { api } from 'services/api';
import { IItem } from 'interfaces/Item';

interface IFetchItemProps {
  id: string | string[];
}

interface IUseItemIdProps {
  id: string | string[];
  initialData: IItem;
}

export async function fetchItem({ id }: IFetchItemProps): Promise<IItem> {
  const { data } = await api.get(`/items/${id}`);

  return data;
}

export function useItemId({
  id,
  initialData,
}: IUseItemIdProps): UseQueryResult<IItem, unknown> {
  return useQuery(['item', id], () => fetchItem({ id }), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData,
  });
}
