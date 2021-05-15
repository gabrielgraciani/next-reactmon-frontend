import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface IDeleteItemProps {
  id: string;
}

const deleteItem = async ({ id }: IDeleteItemProps) => {
  await api.delete(`/items/${id}`);
};

export function useDeleteItem(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(deleteItem, {
    onSuccess: async () => {
      queryClient.invalidateQueries('items_paginated');
    },
  });
}
