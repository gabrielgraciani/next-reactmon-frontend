import { Colors } from 'styles/colors';
import styled from 'styled-components';

import { IInputStyledProps } from './Input.types';

const Container = styled.div`
  width: 100%;
`;

const InputContainer = styled.div<IInputStyledProps>`
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

const Label = styled.label<IInputStyledProps>`
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

const StyledInput = styled.input`
  width: 100%;
  outline: 0;
  border: 0;
  background: transparent;
  padding: 1.5rem 0.8rem;
  color: ${Colors.white};

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

export { Container, InputContainer, Label, StyledInput, ErrorMessage };
