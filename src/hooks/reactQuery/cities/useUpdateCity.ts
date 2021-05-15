import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface IUpdateCityProps {
  id: string;
  data: {
    name: string;
    description: string;
    image: File;
  };
}

const updateCity = async ({ id, data }: IUpdateCityProps) => {
  await api.put(`/cities/${id}`, data);
};

export function useUpdateCity(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(updateCity, {
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries('cities_paginated');
      queryClient.invalidateQueries(['city', variables.id]);
    },
  });
}
