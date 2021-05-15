import styled from 'styled-components';

const Container = styled.form`
  width: 100%;
  margin-top: 2rem;
`;

const FormItem = styled.div`
  & + div {
    margin-top: 1rem;
  }
`;

export { Container, FormItem };
