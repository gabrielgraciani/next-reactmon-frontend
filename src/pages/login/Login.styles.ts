import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

const Text = styled.span`
  display: block;
  margin-top: 2rem;
`;

const CreateAccount = styled.a`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export { Container, Title, Text, CreateAccount };
