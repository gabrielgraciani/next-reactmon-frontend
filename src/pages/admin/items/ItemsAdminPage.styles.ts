import styled from 'styled-components';

import { Colors } from 'styles/colors';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 5%;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 5rem 0 3rem;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled.a`
  border: 1px solid ${Colors.white};
  padding: 1rem;
  border-radius: 0.4rem;
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
  Title,
  HeaderContainer,
  StyledLink,
  LoadingOrErrorContainer,
};
