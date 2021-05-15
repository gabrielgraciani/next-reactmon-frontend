import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Banner } from 'components/Banner';
import { Item } from 'components/Item';
import { Loading } from 'components/Loading';

import {
  fetchItems,
  useInfiniteItems,
} from 'hooks/reactQuery/items/useInfiniteItems';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';

import {
  Container,
  ItemsContainer,
  LoadingOrErrorContainer,
  NoMoreRegisters,
} from './ItemsPage.styles';
import { IItemsPageProps } from './ItemsPage.types';

export default function Items({ itemsProps }: IItemsPageProps): JSX.Element {
  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfiniteItems({ initialData: itemsProps });

  useInfiniteScroll({
    isFetching,
    hasNextPage,
    handleLoadMore: fetchNextPage,
  });

  return (
    <>
      <Head>
        <title>Itens | Reactmon</title>
      </Head>

      <Container>
        <Banner title="Itens" image="/images/banners/banner-items.jpg">
          <p>
            No universo de Pokémon existem diversos itens a nossa disposição e
            cada um possui a sua funcionalidade e importância.
          </p>
          <p>
            Os <b>Held Itens</b> são itens que podem ser segurados por seus
            Pokémon e alguns são considerados os mais importantes para quem joga
            na modalidade competitiva, proporcionando diversas vantagens ao
            Pokémon portador, seja aumento dos atributos ofensivos e defensivos,
            diminuição de dados causados pelo oponente, recuperação de HP
            (health points), dentre outros.{' '}
          </p>
          <p>
            Além disso, as Berries também são muito utilizadas no competitivo e
            ao contrário dos itens que só possuem efeito em batalha elas podem
            ser utilizadas fora dela também.
          </p>
        </Banner>

        {isLoading ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : error ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar os itens. Tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <ItemsContainer>
            {data.pages.map(items =>
              items.data.map(item => <Item item={item} key={item.id} />),
            )}
          </ItemsContainer>
        )}

        {!isLoading && isFetching && (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        )}

        {!hasNextPage && (
          <NoMoreRegisters>Não há mais registros abaixo</NoMoreRegisters>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const itemsProps = await fetchItems({ pageParam: 1 });

  const itemsPropsFormatted = {
    pageParams: [1],
    pages: [itemsProps],
  };

  return {
    props: { itemsProps: itemsPropsFormatted },
  };
};
