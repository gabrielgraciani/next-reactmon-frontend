import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

import { Colors } from 'styles/colors';
import { Breakpoints } from '../../styles/breakpoints';

import { IToastStyledProps } from './Toast.types';

const toastTypeVariations = {
  success: css`
    background: ${Colors.lightGreen};
    color: ${Colors.mediumGreen};
  `,
  error: css`
    background: ${Colors.lightRed};
    color: ${Colors.mediumRed};
  `,
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 6rem;
  padding: 3rem 3rem 3rem 0;
  overflow: hidden;
`;

const ToastContainer = styled(animated.div)<IToastStyledProps>`
  width: 30rem;
  position: relative;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;

  ${props => toastTypeVariations[props.type || 'success']}

  & + div {
    margin-top: 0.8rem;
  }

  @media (max-width: ${Breakpoints.tiny}) {
    width: 24rem;
  }
`;

const InfoContainer = styled.div`
  margin: 0 1.2rem;
  width: fit-content;
`;

const Title = styled.h4`
  color: inherit;
`;

const Description = styled.span``;

const Button = styled.button`
  display: flex;
  opacity: 0.7;
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: 0;
  background: transparent;
  color: inherit;
`;

export { Container, ToastContainer, InfoContainer, Title, Description, Button };
