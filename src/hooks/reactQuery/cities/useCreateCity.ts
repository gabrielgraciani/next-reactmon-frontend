import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface ICreateCityProps {
  data: {
    name: string;
    description: string;
    image: File;
  };
}

const createCity = async ({ data }: ICreateCityProps) => {
  await api.post('/cities', data);
};

export function useCreateCity(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(createCity, {
    onSuccess: async () => {
      queryClient.invalidateQueries('cities_paginated');
    },
  });
}
