export interface IToast {
  id: string;
  type?: 'success' | 'error';
  title: string;
  description?: string;
}
