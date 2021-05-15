import { Colors } from 'styles/colors';
import styled from 'styled-components';

const Container = styled.button`
  width: 100%;
  border: 1px solid ${Colors.white};
  border-radius: 0.4rem;
  background: transparent;
  height: 5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.8);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

export { Container };
