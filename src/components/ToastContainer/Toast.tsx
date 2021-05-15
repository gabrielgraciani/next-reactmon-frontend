import { useEffect } from 'react';
import { useToast } from 'contexts/ToastContext';
import { FiAlertCircle, FiXCircle, FiCheckCircle } from 'react-icons/fi';

import {
  ToastContainer,
  InfoContainer,
  Title,
  Description,
  Button,
} from './ToastContainer.styles';
import { IToastProps } from './Toast.types';

const icons = {
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast = ({ message, style }: IToastProps): JSX.Element => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <ToastContainer key={message.id} type={message.type} style={style}>
      {icons[message.type ?? 'success']}
      <InfoContainer>
        <Title>{message.title}</Title>
        {message.description && (
          <Description>{message.description}</Description>
        )}
      </InfoContainer>

      <Button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </Button>
    </ToastContainer>
  );
};

export default Toast;
