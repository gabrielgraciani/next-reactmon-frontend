import styled, { css } from 'styled-components';

import { Colors } from 'styles/colors';
import { Breakpoints } from 'styles/breakpoints';

import { IPokemonStyledProps } from './PokemonPage.types';

const typesVariation = {
  normal: css`
    background: ${Colors.normal};
  `,
  water: css`
    background: ${Colors.water};
  `,
  electric: css`
    background: ${Colors.electric};
  `,
  fire: css`
    background: ${Colors.fire};
  `,
  psychic: css`
    background: ${Colors.psychic};
  `,
  grass: css`
    background: ${Colors.grass};
  `,
  ice: css`
    background: ${Colors.ice};
  `,
  fairy: css`
    background: ${Colors.fairy};
  `,
  poison: css`
    background: ${Colors.poison};
  `,
  bug: css`
    background: ${Colors.bug};
  `,
  fighting: css`
    background: ${Colors.fighting};
  `,
  rock: css`
    background: ${Colors.rock};
  `,
  ghost: css`
    background: ${Colors.ghost};
  `,
  flying: css`
    background: ${Colors.flying};
  `,
  ground: css`
    background: ${Colors.ground};
  `,
  dragon: css`
    background: ${Colors.dragon};
  `,
  dark: css`
    background: ${Colors.darkpokemon};
  `,
  steel: css`
    background: ${Colors.steel};
  `,
};

const Container = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  width: 90%;
  padding: 0 5%;
  margin: 4rem 0;
`;

const GoBack = styled.a`
  max-width: 10rem;
  padding: 1rem 0;
  font-size: 1.8rem;
  border-radius: 0.5rem;
  background: ${Colors.gray};
  display: flex;
  color: ${Colors.darkGray};
  align-items: center;
  justify-content: center;
`;

const PokemonContainer = styled.section`
  width: 100%;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${Breakpoints.small}) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 48%;
  background: ${Colors.lightGray};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Breakpoints.small}) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  width: auto;
`;

const InfoContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${Breakpoints.small}) {
    width: 100%;
  }
`;

const Name = styled.h1`
  font-size: 3.5rem;
`;

const SpecificationsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: ${Colors.lightGray};
  margin-top: 1rem;
  border-radius: 0.5rem;
`;

const SpecificationItem = styled.div`
  width: 50%;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
`;

const SpecificationItemTitle = styled.span`
  font-weight: bold;
  display: block;
  color: ${Colors.blue};
  margin-bottom: 0.5rem;
`;

const SpecificationItemText = styled.span`
  color: ${Colors.darkGray};
  font-weight: bold;
  font-size: 1.6rem;
`;

const TypesOrWeaknessContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  margin-top: 3rem;
`;

const TypesOrWeaknessTitle = styled.h4`
  width: 100%;
  margin-bottom: 2rem;
  font-size: 2.2rem;
`;

const TypeOrWeaknessItem = styled.span<IPokemonStyledProps>`
  display: block;
  padding: 1rem 3rem;
  border-radius: 0.5rem;
  text-transform: uppercase;
  ${props => typesVariation[props.type]}
  margin-right:1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-right: 0;
  }
`;

export {
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
};
