import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface IDeletePokemonProps {
  id: string;
}

const deletePokemon = async ({ id }: IDeletePokemonProps) => {
  await api.delete(`/pokemons/${id}`);
};

export function useDeletePokemon(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(deletePokemon, {
    onSuccess: async () => {
      queryClient.invalidateQueries('pokemons_paginated');
    },
  });
}
