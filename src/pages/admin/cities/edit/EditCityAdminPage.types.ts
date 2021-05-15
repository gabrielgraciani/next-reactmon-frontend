import { ICity } from 'interfaces/City';

export interface IUpdateCityFormData {
  name: string;
  description: string;
  image: string;
}

export interface IEditCityAdminPageProps {
  id: string;
  cityProps: ICity;
}
