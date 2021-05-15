import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import { v4 as uuid } from 'uuid';
import { IToast } from 'interfaces/Toast';
import { ToastContainer } from '../components/ToastContainer';

interface IToastContextProps {
  addToast(message: Omit<IToast, 'id'>): void;
  removeToast(id: string): void;
}

interface IToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<IToastContextProps>(
  {} as IToastContextProps,
);

const ToastProvider = ({ children }: IToastProviderProps): JSX.Element => {
  const [messages, setMessages] = useState<IToast[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToast, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages =>
      oldMessages.filter(message => message.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): IToastContextProps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { useToast, ToastProvider };
