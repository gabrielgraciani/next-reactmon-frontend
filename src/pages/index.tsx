import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { Card } from 'components/Card';
import { Banner } from 'components/Banner';
import { Item } from 'components/Item';
import { City } from 'components/City';
import { Loading } from 'components/Loading';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

import {
  fetchPokemonsFeatured,
  usePokemonsFeatured,
} from 'hooks/reactQuery/pokemons/usePokemonsFeatured';
import {
  fetchItemsFeatured,
  useItemsFeatured,
} from 'hooks/reactQuery/items/useItemsFeatured';
import {
  fetchCitiesFeatured,
  useCitiesFeatured,
} from 'hooks/reactQuery/cities/useCitiesFeatured';

import {
  Container,
  CardsContainer,
  CardTitle,
  SeeAll,
  CardInfos,
  LoadingOrErrorContainer,
  AbsoluteLoadingContainer,
} from './HomePage.styles';
import { IHomePageProps } from './HomePage.types';

export default function Home({
  pokemonsFeaturedProps,
  itemsFeaturedProps,
  citiesFeaturedProps,
}: IHomePageProps): JSX.Element {
  const {
    data: pokemonsFeatured,
    isLoading: isLoadingPokemonsFeatured,
    error: errorPokemonsFeatured,
    isFetching: isFetchingPokemonsFeatured,
  } = usePokemonsFeatured({ initialData: pokemonsFeaturedProps });

  const {
    data: itemsFeatured,
    isLoading: isLoadingItemsFeatured,
    error: errorItemsFeatured,
    isFetching: isFetchingItemsFeatured,
  } = useItemsFeatured({ initialData: itemsFeaturedProps });

  const {
    data: citiesFeatured,
    isLoading: isLoadingCitiesFeatured,
    error: errorCitiesFeatured,
    isFetching: isFetchingCitiesFeatured,
  } = useCitiesFeatured({ initialData: citiesFeaturedProps });

  return (
    <>
      <Head>
        <title>Home | Reactmon</title>
      </Head>

      <Container>
        <Banner title="Sobre" image="/images/banners/banner-home.jpg">
          <p>
            É uma franquia de mídia que pertence a The Pokémon Company, tendo
            sido criada por Satoshi Tajiri em 1995. Ela é centrada em criaturas
            ficcionais chamadas "Pokémon", que os seres humanos capturam e os
            treinam para lutarem um contra o outro como um esporte.
          </p>

          <p>
            A franquia começou com um par de jogos lançados para o Game Boy
            original, desenvolvidos pela Game Freak e publicados pela Nintendo.
            Atualmente, a franquia se estende em jogos, cartas colecionáveis,
            série de televisão, além de filmes, mangás e brinquedos. Pokémon é a
            segunda franquia de mídia de jogos mais bem sucedida e lucrativa do
            mundo, atrás da franquia de Mario que também pertence a Nintendo.
          </p>
        </Banner>

        <CardInfos>
          <CardTitle>
            Pokémons do momento
            {!isLoadingPokemonsFeatured && isFetchingPokemonsFeatured && (
              <AbsoluteLoadingContainer>
                <Loading size="small" />
              </AbsoluteLoadingContainer>
            )}
          </CardTitle>
          <Link href={ApplicationRoutes.POKEDEX}>
            <SeeAll>Ver Todos</SeeAll>
          </Link>
        </CardInfos>

        {isLoadingPokemonsFeatured ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : errorPokemonsFeatured ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar os pokémons, tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <CardsContainer>
            {pokemonsFeatured.map(pokemon => (
              <Card pokemon={pokemon} key={pokemon.id} />
            ))}
          </CardsContainer>
        )}

        <CardInfos>
          <CardTitle>
            Itens do momento
            {!isLoadingItemsFeatured && isFetchingItemsFeatured && (
              <AbsoluteLoadingContainer>
                <Loading size="small" />
              </AbsoluteLoadingContainer>
            )}
          </CardTitle>
          <Link href={ApplicationRoutes.ITEMS}>
            <SeeAll>Ver Todos</SeeAll>
          </Link>
        </CardInfos>

        {isLoadingItemsFeatured ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : errorItemsFeatured ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar os itens, tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <CardsContainer>
            {itemsFeatured.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </CardsContainer>
        )}

        <CardInfos>
          <CardTitle>
            Cidades do momento
            {!isLoadingCitiesFeatured && isFetchingCitiesFeatured && (
              <AbsoluteLoadingContainer>
                <Loading size="small" />
              </AbsoluteLoadingContainer>
            )}
          </CardTitle>
          <Link href={ApplicationRoutes.CITIES}>
            <SeeAll>Ver Todos</SeeAll>
          </Link>
        </CardInfos>

        {isLoadingCitiesFeatured ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : errorCitiesFeatured ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar as cidades, tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <CardsContainer>
            {citiesFeatured.map(city => (
              <City city={city} key={city.id} />
            ))}
          </CardsContainer>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemonsFeaturedProps = await fetchPokemonsFeatured();
  const itemsFeaturedProps = await fetchItemsFeatured();
  const citiesFeaturedProps = await fetchCitiesFeatured();

  return {
    props: { pokemonsFeaturedProps, itemsFeaturedProps, citiesFeaturedProps },
  };
};
