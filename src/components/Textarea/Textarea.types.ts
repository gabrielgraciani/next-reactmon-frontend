import { TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface ITextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  error?: FieldError;
}

export interface ITextareaStyledProps {
  isInvalid: boolean;
  isActive: boolean;
}
