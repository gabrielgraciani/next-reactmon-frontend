import styled from 'styled-components';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

import { Colors } from '../../styles/colors';

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THead = styled.thead``;

const TBody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 0.1rem solid ${Colors.gray};

  &:last-child {
    border-bottom: 0;
  }
`;

const Th = styled.th`
  border-bottom: 0.1rem solid ${Colors.gray};
  padding: 1.6rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1.6rem;
`;

const TdContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const EditIcon = styled(FiEdit2)`
  margin-right: 1rem;
  font-size: 1.6rem;
`;

const RemoveIcon = styled(FiTrash2)`
  margin-right: 1rem;
  font-size: 1.6rem;
`;

const TableImage = styled.img`
  width: 100%;
  max-width: 10rem;
`;

export {
  Container,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  TdContainer,
  EditIcon,
  RemoveIcon,
  TableImage,
};
