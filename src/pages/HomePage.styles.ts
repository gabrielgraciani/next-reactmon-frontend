import styled from 'styled-components';

import { Colors } from 'styles/colors';
import { Breakpoints } from 'styles/breakpoints';

const Container = styled.div``;

const CardsContainer = styled.div`
  width: 100%;
  padding: 0 5%;
  margin: 3rem auto 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  grid-gap: 4rem 1.6rem;

  @media (max-width: ${Breakpoints.tiny}) {
    padding: 0 2%;
  }
`;

const CardInfos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  padding: 0 5%;
`;

const CardTitle = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  position: relative;
`;

const AbsoluteLoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: -5rem;
`;

const SeeAll = styled.a`
  margin-top: 1rem;
  background: transparent;
  border: 1px solid ${Colors.gray};
  border-radius: 0.4rem;
  padding: 1rem 4rem;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

const LoadingOrErrorContainer = styled.div`
  margin: 3rem auto 4rem;
  text-align: center;
  color: ${Colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  Container,
  CardInfos,
  CardsContainer,
  CardTitle,
  SeeAll,
  LoadingOrErrorContainer,
  AbsoluteLoadingContainer,
};
