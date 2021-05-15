import { useTransition } from 'react-spring';

import Toast from './Toast';

import { Container } from './ToastContainer.styles';
import { IToastContainerProps } from './ToastContainer.types';

const ToastContainer = ({ messages }: IToastContainerProps): JSX.Element => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {messagesWithTransitions((style, item) => (
        <Toast message={item} style={style} />
      ))}
    </Container>
  );
};

export default ToastContainer;
