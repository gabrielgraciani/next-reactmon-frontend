import { IToast } from 'interfaces/Toast';

export interface IToastProps {
  message: IToast;
  style: Record<string, unknown>;
}

export interface IToastStyledProps {
  type?: 'success' | 'error';
}
