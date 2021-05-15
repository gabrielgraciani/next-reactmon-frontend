import PaginationItem from './PaginationItem';

import {
  Container,
  TotalData,
  PaginationContainer,
  Dots,
} from './Pagination.styles';
import { IPaginationProps } from './Pagination.types';

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

const Pagination = ({
  currentPage,
  onPageChange,
  limitPerPage = 12,
  siblingsCount = 1,
  totalCountOfRegisters,
}: IPaginationProps): JSX.Element => {
  const totalOfPages = Math.ceil(totalCountOfRegisters / limitPerPage);

  const startIndex = (currentPage - 1) * limitPerPage;
  const endIndex =
    startIndex + limitPerPage > totalCountOfRegisters
      ? totalCountOfRegisters
      : startIndex + limitPerPage;

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < totalOfPages
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, totalOfPages),
        )
      : [];

  return (
    <Container>
      <TotalData>
        <strong>{startIndex}</strong> - <strong>{endIndex}</strong> de{' '}
        <strong>{totalCountOfRegisters}</strong>
      </TotalData>

      <PaginationContainer>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && <Dots>...</Dots>}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}

        {currentPage + siblingsCount < totalOfPages && (
          <>
            {currentPage + 1 + siblingsCount < totalOfPages && <Dots>...</Dots>}
            <PaginationItem onPageChange={onPageChange} number={totalOfPages} />
          </>
        )}
      </PaginationContainer>
    </Container>
  );
};

export default Pagination;
