import { ReactNode } from 'react';

export interface IButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}
