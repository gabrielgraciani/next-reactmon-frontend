import { ElementType, ReactElement } from 'react';

export interface IPopoverTypes {
  children: ReactElement;
  content: ElementType;
  onClose: () => void;
  visible: boolean;
  onVisibleChange: () => void;
}
