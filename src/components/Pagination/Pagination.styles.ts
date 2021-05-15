import { Colors } from 'styles/colors';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
`;

const TotalData = styled.span``;

const PaginationContainer = styled.div`
  display: flex;
`;

const StyledPaginationItem = styled.button`
  min-width: 3.5rem;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.mediumGray};
  border-radius: 0.4rem;
  margin-left: 1rem;
  font-weight: bold;

  &:first-child {
    margin-left: 0;
  }

  &:disabled {
    background: ${Colors.orange};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    filter: brightness(0.8);
  }
`;

const Dots = styled.div`
  line-height: 2rem;
  font-size: 2.5rem;
  margin-left: 1rem;
`;

export {
  Container,
  TotalData,
  PaginationContainer,
  StyledPaginationItem,
  Dots,
};
