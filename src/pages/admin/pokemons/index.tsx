import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

import { Table } from 'components/Table';
import { Loading } from 'components/Loading';

import {
  usePaginatedPokemons,
  fetchPokemons,
} from 'hooks/reactQuery/pokemons/usePaginatedPokemons';
import { useDeletePokemon } from 'hooks/reactQuery/pokemons/useDeletePokemon';

import { Pagination } from 'components/Pagination';
import { ApplicationRoutes } from 'config/ApplicationRoutes';
import {
  Container,
  Title,
  HeaderContainer,
  LoadingOrErrorContainer,
  StyledLink,
} from './PokemonsAdminPage.styles';
import { IPokemonsAdminPageProps } from './PokemonsAdminPage.types';

export default function PokemonsList({
  pokemonsProps,
}: IPokemonsAdminPageProps): JSX.Element {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { mutateAsync } = useDeletePokemon();

  const { data, isLoading, error, isFetching } = usePaginatedPokemons({
    page,
    initialData: pokemonsProps,
  });

  const columns = [
    {
      title: 'ID',
    },
    {
      title: 'Nome',
    },
    {
      title: 'Tipos',
    },
    {
      title: 'Fraquezas',
    },
    {
      title: 'Imagem',
    },
  ];

  const handleDeletePokemon = async (id: string) => {
    await mutateAsync({ id });
  };

  return (
    <>
      <Head>
        <title>Listagem de Pokemons | Reactmon</title>
      </Head>

      <Container>
        <HeaderContainer>
          <Title>Lista de pokemons</Title>

          <Link href={ApplicationRoutes.ADMIN.POKEMONS.CREATE}>
            <StyledLink>Criar um pokemon</StyledLink>
          </Link>
        </HeaderContainer>

        {isLoading ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : error ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar os pokemons. Tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <>
            <Table columns={columns} isAdmin>
              {data.pokemons.map(pokemon => (
                <Table.Tr key={pokemon.id}>
                  <Table.Td>{pokemon.id}</Table.Td>
                  <Table.Td>{pokemon.name}</Table.Td>
                  <Table.Td>
                    {pokemon.types.map(type => type).join(', ')}
                  </Table.Td>
                  <Table.Td>
                    {pokemon.weakness.map(weak => weak).join(', ')}
                  </Table.Td>
                  <Table.Td>
                    <Table.Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/files/${pokemon.image}`}
                      alt={pokemon.name}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Table.TdContainer
                      onClick={() => {
                        router.push(
                          `${ApplicationRoutes.ADMIN.POKEMONS.EDIT}/${pokemon.id}`,
                        );
                      }}
                    >
                      <Table.EditIcon /> Editar
                    </Table.TdContainer>
                  </Table.Td>
                  <Table.Td>
                    <Table.TdContainer
                      onClick={() => handleDeletePokemon(pokemon.id)}
                    >
                      <Table.RemoveIcon /> Remover
                    </Table.TdContainer>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table>

            <Pagination
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}

        {!isLoading && isFetching && (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemonsProps = await fetchPokemons({ page: 1 });
  return {
    props: { pokemonsProps },
  };
};
