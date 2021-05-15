import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface IUpdatePokemonProps {
  id: string;
  data: {
    name: string;
    weight: string;
    height: string;
    types: string;
    weakness: string;
    image: File;
  };
}

const updatePokemon = async ({ id, data }: IUpdatePokemonProps) => {
  await api.put(`/pokemons/${id}`, data);
};

export function useUpdatePokemon(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(updatePokemon, {
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries('pokemons_paginated');
      queryClient.invalidateQueries(['pokemon', variables.id]);
    },
  });
}
