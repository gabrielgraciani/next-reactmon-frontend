import styled, { css } from 'styled-components';

import { Colors } from 'styles/colors';

import {
  ICardStyledProps,
  ICardSpecificationItemStyledProps,
} from './Card.types';

const cardVariations = {
  normal: css`
    background: ${Colors.normalGradient};
  `,
  water: css`
    background: ${Colors.waterGradient};
  `,
  electric: css`
    background: ${Colors.electricGradient};
  `,
  fire: css`
    background: ${Colors.fireGradient};
  `,
  psychic: css`
    background: ${Colors.psychicGradient};
  `,
  grass: css`
    background: ${Colors.grassGradient};
  `,
  ice: css`
    background: ${Colors.iceGradient};
  `,
  fairy: css`
    background: ${Colors.fairyGradient};
  `,
  poison: css`
    background: ${Colors.poisonGradient};
  `,
  bug: css`
    background: ${Colors.bugGradient};
  `,
  fighting: css`
    background: ${Colors.fightingGradient};
  `,
  rock: css`
    background: ${Colors.rockGradient};
  `,
  ghost: css`
    background: ${Colors.ghostGradient};
  `,
  flying: css`
    background: ${Colors.flyingGradient};
  `,
  ground: css`
    background: ${Colors.groundGradient};
  `,
  dragon: css`
    background: ${Colors.dragonGradient};
  `,
  dark: css`
    background: ${Colors.darkpokemonGradient};
  `,
  steel: css`
    background: ${Colors.steelGradient};
  `,
};

const cardTypeVariations = {
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

const Image = styled.img`
  width: 100%;
  max-width: 20rem;
  transition: transform 0.3s ease;
`;

const Container = styled.a<ICardStyledProps>`
  transition: all 0.3s ease;
  overflow: hidden;
  width: 100%;
  position: relative;
  border-radius: 1rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${props => cardVariations[props.type]}

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100px;
    height: 100%;
    background: ${Colors.whiteOpacity30};
    transform: skewX(-30deg);
    transition: all 0.7s ease;
    filter: blur(10px);
  }

  &:hover {
    transform: translateY(-4%);
  }

  &:hover:after {
    left: 140%;
  }

  &:hover ${Image} {
    transform: rotateY(180deg) scale(1.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 26rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.blackOpacity70};
`;

const ContentContainer = styled.div`
  padding: 0 0 2rem 0;
  background: ${Colors.lightGrayOpacity70};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Types = styled.div`
  margin-top: -1.3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.5rem 0 0;
`;

const TypeItem = styled.div<ICardStyledProps>`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => cardTypeVariations[props.type]};

  & + div {
    margin-left: 1rem;
  }
`;

const TypeText = styled.span`
  text-transform: uppercase;
  color: ${Colors.white};
  font-weight: 400;
  letter-spacing: 0.1rem;
`;

const Name = styled.h4`
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  color: ${Colors.black};
  font-size: 2.4rem;
  font-weight: 700;
`;

const Specifications = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 9.5rem;
  flex-direction: column;
  padding: 0 2rem;
`;

const SpecificationsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const SpecificationsText = styled.span<ICardSpecificationItemStyledProps>`
  display: block;
  width: 50%;
  font-size: 1.6rem;
  font-weight: 300;
  color: ${Colors.black};
  text-align: ${props => props.align};
  padding: ${props => (props.align === 'left' ? '0 0 0 1rem' : '0 1rem 0 0')};
  font-style: italic;
`;

export {
  Container,
  ImageContainer,
  Image,
  ContentContainer,
  Types,
  TypeItem,
  TypeText,
  Name,
  Specifications,
  SpecificationsRow,
  SpecificationsText,
};
