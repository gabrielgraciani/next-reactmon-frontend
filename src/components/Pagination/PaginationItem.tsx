import { IPaginationItemProps } from './Pagination.types';

import { StyledPaginationItem } from './Pagination.styles';

const PaginationItem = ({
  number,
  onPageChange,
  isCurrent,
}: IPaginationItemProps): JSX.Element => {
  return (
    <StyledPaginationItem
      disabled={isCurrent}
      onClick={() => onPageChange(number)}
    >
      {number}
    </StyledPaginationItem>
  );
};

export default PaginationItem;
