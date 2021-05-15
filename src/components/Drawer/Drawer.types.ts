import { ReactElement, ElementType } from 'react';

export interface IDrawerProps {
  children: ReactElement;
  content: ElementType;
  onClose: () => void;
  visible: boolean;
  onVisibleChange: () => void;
}
