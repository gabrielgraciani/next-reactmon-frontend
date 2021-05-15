import { ReactNode, FormHTMLAttributes } from 'react';

export interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
