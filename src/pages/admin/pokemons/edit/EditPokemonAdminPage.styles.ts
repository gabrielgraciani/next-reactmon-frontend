import styled from 'styled-components';

import { Colors } from 'styles/colors';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 5% 5rem;
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
  margin: 2rem 0;
  text-align: center;
  color: ${Colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 30rem;
  height: auto;
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
`;

const TypesOrWeaknessTitle = styled.span`
  display: block;
  margin: 2rem 0 1rem;
`;

const CheckboxError = styled.span`
  color: ${Colors.red};
  display: block;
  margin: 0.5rem 0;
`;

export {
  Container,
  Title,
  HeaderContainer,
  StyledLink,
  LoadingOrErrorContainer,
  Image,
  CheckboxContainer,
  TypesOrWeaknessTitle,
  CheckboxError,
};
