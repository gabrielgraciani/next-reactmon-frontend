import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface IUpdateItemProps {
  id: string;
  data: {
    name: string;
    description: string;
    function: string;
    image: File;
  };
}

const updateItem = async ({ id, data }: IUpdateItemProps) => {
  await api.put(`/items/${id}`, data);
};

export function useUpdateItem(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(updateItem, {
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries('items_paginated');
      queryClient.invalidateQueries(['item', variables.id]);
    },
  });
}
