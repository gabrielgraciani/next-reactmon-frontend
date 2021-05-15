import { useQuery, UseQueryResult } from 'react-query';

import { api } from 'services/api';
import { IType } from 'interfaces/Type';

export async function fetchTypes(): Promise<IType[]> {
  const { data } = await api.get('/types');

  return data;
}

export function useTypes(): UseQueryResult<IType[], unknown> {
  return useQuery(['types'], fetchTypes, {
    staleTime: 1000 * 60 * 100, // 100 minutes
  });
}
