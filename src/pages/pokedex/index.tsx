import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Card } from 'components/Card';
import { Banner } from 'components/Banner';
import { Loading } from 'components/Loading';

import {
  useInfinitePokemons,
  fetchPokemons,
} from 'hooks/reactQuery/pokemons/useInfinitePokemons';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';

import {
  Container,
  CardsContainer,
  LoadingOrErrorContainer,
  NoMoreRegisters,
} from './PokedexPage.styles';
import { IPokedexPageProps } from './PokedexPage.types';

export default function Pokedex({
  pokemonsProps,
}: IPokedexPageProps): JSX.Element {
  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfinitePokemons({ initialData: pokemonsProps });

  useInfiniteScroll({
    isFetching,
    hasNextPage,
    handleLoadMore: fetchNextPage,
  });

  return (
    <>
      <Head>
        <title>Pokédex | Reactmon</title>
      </Head>

      <Container>
        <Banner title="Pokédex" image="/images/banners/banner-pokedex.png">
          <p>
            A franquia Pokémon gira em torno de 890 espécies fictícias de
            monstros colecionáveis, cada um com designs e habilidades únicas. Os
            projetos para a multiplicidade de espécies podem inspirar-se em
            qualquer coisa como animais, plantas, criaturas mitológicas e até
            objetos inanimados. Muitos Pokémon são capazes de evoluir para
            espécies mais poderosas, enquanto outros podem sofrer mudanças de
            forma e obter resultados semelhantes.
          </p>

          <p>
            A vasta gama de criaturas é comumente dividida em "gerações", com
            cada divisão englobando principalmente novos títulos no série de
            jogos eletrônicos principais e muitas vezes uma mudança da
            plataforma portátil. Devido ao grande número de Pokémon, a listagem
            de cada espécie é dividida é apenas da primeira geração.
          </p>
        </Banner>

        {isLoading ? (
          <LoadingOrErrorContainer>
            <Loading />
          </LoadingOrErrorContainer>
        ) : error ? (
          <LoadingOrErrorContainer>
            Ocorreu um erro ao carregar os pokémons. Tente novamente mais tarde
          </LoadingOrErrorContainer>
        ) : (
          <CardsContainer>
            {data.pages.map(pokemons =>
              pokemons.data.map(pokemon => (
                <Card pokemon={pokemon} key={pokemon.id} />
              )),
            )}
          </CardsContainer>
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
  const pokemonsProps = await fetchPokemons({ pageParam: 1 });

  const pokemonsPropsFormatted = {
    pageParams: [1],
    pages: [pokemonsProps],
  };

  return {
    props: { pokemonsProps: pokemonsPropsFormatted },
  };
};
