import { Colors } from 'styles/colors';
import styled from 'styled-components';

import { ITextareaStyledProps } from './Textarea.types';

const Container = styled.div`
  width: 100%;
`;

const TextareaContainer = styled.div<ITextareaStyledProps>`
  width: 100%;
  border: 0.1rem solid ${Colors.grayOpacity50};
  border-radius: 0.4rem;
  position: relative;
  transition: all 0.2s ease;

  &.active {
    border-color: ${Colors.lightBlue};
  }

  &.error {
    border-color: ${Colors.red};
  }
`;

const Label = styled.label<ITextareaStyledProps>`
  pointer-events: none;
  background: ${Colors.darkGray};
  transition: all 0.2s ease;
  margin-bottom: 0.4rem;
  display: block;

  &.active {
    color: ${Colors.lightBlue};
  }

  &.error {
    color: ${Colors.red};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  outline: 0;
  border: 0;
  background: transparent;
  padding: 1.5rem 0.8rem;
  color: ${Colors.white};
  min-height: 15rem;

  :-webkit-autofill {
    box-shadow: 0 0 0 100rem ${Colors.darkGray} inset;
    color: ${Colors.white};
  }
`;

const ErrorMessage = styled.span`
  display: block;
  color: ${Colors.red};
  font-size: 1.2rem;
  margin-top: 0.3rem;
`;

export { Container, TextareaContainer, Label, StyledTextarea, ErrorMessage };
