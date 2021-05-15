import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface ICreateItemProps {
  data: {
    name: string;
    description: string;
    function: string;
    image: File;
  };
}

const createItem = async ({ data }: ICreateItemProps) => {
  await api.post('/items', data);
};

export function useCreateItem(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(createItem, {
    onSuccess: async () => {
      queryClient.invalidateQueries('items_paginated');
    },
  });
}
