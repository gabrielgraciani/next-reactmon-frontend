import { ICity } from '../City';

export interface ICitiesResponse {
  data: ICity[];
  meta: {
    total_records: number;
    total_pages: number;
    has_next_page: boolean;
    current_page: number;
  };
}
