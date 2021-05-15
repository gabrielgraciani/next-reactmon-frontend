import { ReactNode } from 'react';

interface IColumn {
  title: string;
}

export interface ITableProps {
  columns: IColumn[];
  isAdmin?: boolean;
  children: ReactNode;
}
