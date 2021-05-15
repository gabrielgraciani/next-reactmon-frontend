import { useRouter } from 'next/router';
import { BiFemaleSign, BiMaleSign } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

import {
  usePokemonId,
  fetchPokemon,
} from 'hooks/reactQuery/pokemons/usePokemonId';

import { formatWeight } from 'helpers/formatWeight';
import { formatHeight } from 'helpers/formatHeight';
import { formatLowerCase } from 'helpers/formatLowerCase';
import {
  Container,
  HeaderContainer,
  GoBack,
  PokemonContainer,
  ImageContainer,
  Image,
  InfoContainer,
  Name,
  SpecificationsContainer,
  SpecificationItem,
  SpecificationItemTitle,
  SpecificationItemText,
  TypesOrWeaknessContainer,
  TypesOrWeaknessTitle,
  TypeOrWeaknessItem,
} from './PokemonPage.styles';
import { IPokemonPageProps } from './PokemonPage.types';

export default function Pokemon({
  pokemonProps,
  id,
}: IPokemonPageProps): JSX.Element {
  const router = useRouter();

  const { data: pokemon } = usePokemonId({
    id,
    initialData: pokemonProps,
  });

  return (
    <>
      <Head>
        <title>{pokemon.name} | Reactmon</title>
      </Head>
      <Container>
        <HeaderContainer>
          <GoBack onClick={() => router.back()}>Voltar</GoBack>
        </HeaderContainer>
        <PokemonContainer>
          <ImageContainer>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/files/${pokemon.image}`}
              alt={pokemon.name}
            />
          </ImageContainer>

          <InfoContainer>
            <Name>{pokemon.name}</Name>

            <SpecificationsContainer>
              <SpecificationItem>
                <SpecificationItemTitle>Peso</SpecificationItemTitle>
                <SpecificationItemText>
                  {formatWeight(pokemon.weight)}
                </SpecificationItemText>
              </SpecificationItem>

              <SpecificationItem>
                <SpecificationItemTitle>Altura</SpecificationItemTitle>
                <SpecificationItemText>
                  {formatHeight(pokemon.height)}
                </SpecificationItemText>
              </SpecificationItem>

              <SpecificationItem>
                <SpecificationItemTitle>Gênero</SpecificationItemTitle>
                <SpecificationItemText>
                  <BiMaleSign fontSize="1.8rem" />
                  <BiFemaleSign fontSize="1.8rem" />
                </SpecificationItemText>
              </SpecificationItem>
            </SpecificationsContainer>

            <TypesOrWeaknessContainer>
              <TypesOrWeaknessTitle>Tipos</TypesOrWeaknessTitle>
              {pokemon.types.map(type => (
                <TypeOrWeaknessItem type={formatLowerCase(type)} key={type}>
                  {type}
                </TypeOrWeaknessItem>
              ))}
            </TypesOrWeaknessContainer>

            <TypesOrWeaknessContainer>
              <TypesOrWeaknessTitle>Fraquezas</TypesOrWeaknessTitle>
              {pokemon.weakness.map(weak => (
                <TypeOrWeaknessItem type={formatLowerCase(weak)} key={weak}>
                  {weak}
                </TypeOrWeaknessItem>
              ))}
            </TypesOrWeaknessContainer>
          </InfoContainer>
        </PokemonContainer>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const pokemonProps = await fetchPokemon({ id });

  return {
    props: { pokemonProps, id },
    revalidate: 60 * 30, // 30 minutes
  };
};
