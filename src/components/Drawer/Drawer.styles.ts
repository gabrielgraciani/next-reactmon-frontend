import { FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { animated } from 'react-spring';

import { Colors } from 'styles/colors';

const Container = styled.div`
  position: relative;
  z-index: 99;
`;

const DrawerContent = styled(animated.div)`
  position: fixed;
  top: 0;
  width: 25rem;
  height: 100%;
  background: ${Colors.white};
  box-shadow: 0 0 10px ${Colors.white};
  color: ${Colors.darkGray};
  padding: 5rem 1.5rem;
`;

const CloseIcon = styled(FiX)`
  position: absolute;
  top: 1rem;
  right: 5%;
  font-size: 2.4rem;
  cursor: pointer;
`;

export { Container, DrawerContent, CloseIcon };
