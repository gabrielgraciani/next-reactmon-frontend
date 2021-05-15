import { ReactNode } from 'react';

export interface IBannerProps {
  image: string;
  title: string;
  children: ReactNode;
}

export interface IBannerStyledProps {
  image: string;
}
