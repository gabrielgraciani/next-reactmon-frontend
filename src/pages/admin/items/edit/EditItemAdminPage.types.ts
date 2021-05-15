import { IItem } from 'interfaces/Item';

export interface IUpdateItemFormData {
  name: string;
  description: string;
  function: string;
  image: string;
}

export interface IEditItemAdminPageProps {
  id: string;
  itemProps: IItem;
}
