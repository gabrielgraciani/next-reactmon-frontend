import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

import { Table } from 'components/Table';
import { Loading } from 'components/Loading';

import {
  usePaginatedCities,
  fetchCities,
} from 'hooks/reactQuery/cities/usePaginatedCities';
import { useDeleteCity } from 'hooks/reactQuery/cities/useDeleteCity';

import { Pagination } from 'components/Pagination';
import { ApplicationRoutes } from 'config/ApplicationRoutes';
import {
  Container,
  Title,
  HeaderContainer,
  LoadingOrErrorContainer,
  StyledLink,
} from './CitiesAdminPage.styles';
import { ICitiesAdminPageProps } from './CitiesAdminPage.types';

export default function CitiesList({
  citiesProps,
}: ICitiesAdminPageProps): JSX.Element {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { mutateAsync } = useDeleteCity();

  const { data, isLoading, error, isFetching } = usePaginatedCities({
    page,
    initialData: citiesProps,
  });

  const columns = [
    {
      title: 'ID',
    },
    {
      title: 'Nome',
    },
    {
      title: 'Descrição',
    },
    {
      title: 'Imagem',
    },
  ];

  const handleDeleteCity = async (id: string) => {
    await mutateAsync({ id });
  };

  return (
    <>
      <Head>
        <title>Listagem de Cidades | Reactmon</title>
      </Head>

      <Container>
        <HeaderContainer>
          <Title>Lista de cidades</Title>

          <Link href={ApplicationRoutes.ADMIN.CITIES.CREATE}>
            <StyledLink>Criar uma cidade</StyledLink>
          </Link>
        </HeaderContainer>

        {isLoading ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : error ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar as cidades. Tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <>
            <Table columns={columns} isAdmin>
              {data.cities.map(city => (
                <Table.Tr key={city.id}>
                  <Table.Td>{city.id}</Table.Td>
                  <Table.Td>{city.name}</Table.Td>
                  <Table.Td>{city.description}</Table.Td>
                  <Table.Td>
                    <Table.Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/files/${city.image}`}
                      alt={city.name}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Table.TdContainer
                      onClick={() => {
                        router.push(
                          `${ApplicationRoutes.ADMIN.CITIES.EDIT}/${city.id}`,
                        );
                      }}
                    >
                      <Table.EditIcon /> Editar
                    </Table.TdContainer>
                  </Table.Td>
                  <Table.Td>
                    <Table.TdContainer
                      onClick={() => handleDeleteCity(city.id)}
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
  const citiesProps = await fetchCities({ page: 1 });
  return {
    props: { citiesProps },
  };
};
