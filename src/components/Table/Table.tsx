import {
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
} from './Table.styles';
import { ITableProps } from './Table.types';

const Table = ({ columns, isAdmin, children }: ITableProps): JSX.Element => {
  return (
    <Container>
      <THead>
        <Tr>
          {columns.map(column => (
            <Th key={column.title}>{column.title}</Th>
          ))}
          {isAdmin && (
            <>
              <Th>Editar</Th>
              <Th>Excluir</Th>
            </>
          )}
        </Tr>
      </THead>

      <TBody>{children}</TBody>
    </Container>
  );
};

Table.Image = TableImage;
Table.Tr = Tr;
Table.Td = Td;
Table.TdContainer = TdContainer;
Table.EditIcon = EditIcon;
Table.RemoveIcon = RemoveIcon;

export default Table;
