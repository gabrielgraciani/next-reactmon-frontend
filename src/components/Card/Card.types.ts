import { IPokemon } from 'interfaces/Pokemon';

export interface ICardProps {
  pokemon: IPokemon;
}

export interface ICardStyledProps {
  type: string;
}

export interface ICardSpecificationItemProps {
  title: string;
  value: string;
}

export interface ICardSpecificationItemStyledProps {
  align: 'left' | 'right';
}
