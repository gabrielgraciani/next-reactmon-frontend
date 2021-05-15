import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface IDeleteCityProps {
  id: string;
}

const deleteCity = async ({ id }: IDeleteCityProps) => {
  await api.delete(`/cities/${id}`);
};

export function useDeleteCity(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(deleteCity, {
    onSuccess: async () => {
      queryClient.invalidateQueries('cities_paginated');
    },
  });
}
