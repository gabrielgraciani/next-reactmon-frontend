import styled, { keyframes } from 'styled-components';

import { Colors } from '../../styles/colors';
import { ILoadingStyledProps } from './Loading.types';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div<ILoadingStyledProps>`
  width: ${props => (props.size === 'small' ? '2rem' : '4rem')};
  height: ${props => (props.size === 'small' ? '2rem' : '4rem')};
  border: ${props => (props.size === 'small' ? '0.2rem' : '0.4rem')} solid
    ${Colors.white};
  border-top: ${props => (props.size === 'small' ? '0.2rem' : '0.4rem')} solid
    ${Colors.blue};
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

export { Container };
