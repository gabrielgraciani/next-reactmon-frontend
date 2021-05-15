import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { api } from 'services/api';

interface ICreatePokemonProps {
  data: {
    name: string;
    weight: string;
    height: string;
    types: string;
    weakness: string;
    image: File;
  };
}

const createPokemon = async ({ data }: ICreatePokemonProps) => {
  await api.post('/pokemons', data);
};

export function useCreatePokemon(): UseMutationResult<void> {
  const queryClient = useQueryClient();
  return useMutation(createPokemon, {
    onSuccess: async () => {
      queryClient.invalidateQueries('pokemons_paginated');
    },
  });
}
