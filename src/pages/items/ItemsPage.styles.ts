import styled from 'styled-components';

import { Breakpoints } from 'styles/breakpoints';
import { Colors } from 'styles/colors';

const Container = styled.div`
  width: 100%;
`;

const ItemsContainer = styled.section`
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

const LoadingOrErrorContainer = styled.div`
  margin: 3rem auto 4rem;
  text-align: center;
  color: ${Colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoMoreRegisters = styled.h4`
  text-align: center;
  font-weight: normal;
  font-size: 1.8rem;
  margin-bottom: 3rem;
`;

export { Container, ItemsContainer, LoadingOrErrorContainer, NoMoreRegisters };
