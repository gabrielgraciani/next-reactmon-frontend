import { IItem } from '../Item';

export interface IItemsResponse {
  data: IItem[];
  meta: {
    total_records: number;
    total_pages: number;
    has_next_page: boolean;
    current_page: number;
  };
}
