import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Banner } from 'components/Banner';
import { City } from 'components/City';
import { Loading } from 'components/Loading';

import {
  fetchCities,
  useInfiniteCities,
} from 'hooks/reactQuery/cities/useInfiniteCities';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';

import {
  Container,
  CitiesContainer,
  LoadingOrErrorContainer,
  NoMoreRegisters,
} from './CitiesPage.styles';
import { ICitiesPageProps } from './CitiesPage.types';

export default function Cities({ citiesProps }: ICitiesPageProps): JSX.Element {
  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfiniteCities({ initialData: citiesProps });

  useInfiniteScroll({
    isFetching,
    hasNextPage,
    handleLoadMore: fetchNextPage,
  });

  return (
    <>
      <Head>
        <title>Cidades | Reactmon</title>
      </Head>

      <Container>
        <Banner title="Cidades" image="/images/banners/banner-cities.png">
          <p>
            Muitas regiões foram descritas na franquia de jogos eletrônicos,
            desenhos animados e quadrinhos Pokémon. Cada uma das gerações de
            RPGs Originais de Pokémon introduziu uma nova Região. Há ainda,
            algumas Regiões introduzidas em games Spin-offs, como Pokémon
            Ranger, Pokémon Mystery Dungeon e principalmente Pokémon Colosseum e
            Pokémon XD. Nos jogos, não é possível acessar outras Regiões de
            outros games, exceto Kanto, acessível em Pokémon Gold, Silver &
            Crystal após a vitória sobre a Elite dos Quatro.
          </p>

          <p>
            Todas as Regiões onde se passa um RPG Original são baseadas em
            regiões reais do Japão e a região de Orre também é baseada em uma
            área do Japão. As regiões também podem ser consideradas como países,
            pois, embora não haja significativa diferença cultural entre os
            moradores da diferentes regiões, nas versões em inglês dos jogos
            Pokémon Gold e Pokémon Silver, o mapa refere-se a Kanto e Johto como
            countrys.
          </p>
        </Banner>

        {isLoading ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : error ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar as cidades. Tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <CitiesContainer>
            {data.pages.map(cities =>
              cities.data.map(city => <City city={city} key={city.id} />),
            )}
          </CitiesContainer>
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
  const citiesProps = await fetchCities({ pageParam: 1 });

  const citiesPropsFormatted = {
    pageParams: [1],
    pages: [citiesProps],
  };

  return {
    props: { citiesProps: citiesPropsFormatted },
  };
};
