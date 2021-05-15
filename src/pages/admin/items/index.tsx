import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

import { Table } from 'components/Table';
import { Loading } from 'components/Loading';

import {
  usePaginatedItems,
  fetchItems,
} from 'hooks/reactQuery/items/usePaginatedItems';
import { useDeleteItem } from 'hooks/reactQuery/items/useDeleteItem';

import { Pagination } from 'components/Pagination';
import { ApplicationRoutes } from 'config/ApplicationRoutes';
import {
  Container,
  Title,
  HeaderContainer,
  LoadingOrErrorContainer,
  StyledLink,
} from './ItemsAdminPage.styles';
import { IItemsAdminPageProps } from './ItemsAdminPage.types';

export default function ItemsList({
  itemsProps,
}: IItemsAdminPageProps): JSX.Element {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { mutateAsync } = useDeleteItem();

  const { data, isLoading, error, isFetching } = usePaginatedItems({
    page,
    initialData: itemsProps,
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
      title: 'Função',
    },
    {
      title: 'Imagem',
    },
  ];

  const handleDeleteItem = async (id: string) => {
    await mutateAsync({ id });
  };

  return (
    <>
      <Head>
        <title>Listagem de itens | Reactmon</title>
      </Head>

      <Container>
        <HeaderContainer>
          <Title>Lista de itens</Title>

          <Link href={ApplicationRoutes.ADMIN.ITEMS.CREATE}>
            <StyledLink>Criar um item</StyledLink>
          </Link>
        </HeaderContainer>

        {isLoading ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : error ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar os items. Tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <>
            <Table columns={columns} isAdmin>
              {data.items.map(item => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.description}</Table.Td>
                  <Table.Td>{item.function}</Table.Td>
                  <Table.Td>
                    <Table.Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/files/${item.image}`}
                      alt={item.name}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Table.TdContainer
                      onClick={() => {
                        router.push(
                          `${ApplicationRoutes.ADMIN.ITEMS.EDIT}/${item.id}`,
                        );
                      }}
                    >
                      <Table.EditIcon /> Editar
                    </Table.TdContainer>
                  </Table.Td>
                  <Table.Td>
                    <Table.TdContainer
                      onClick={() => handleDeleteItem(item.id)}
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
  const itemsProps = await fetchItems({ page: 1 });
  return {
    props: { itemsProps },
  };
};
