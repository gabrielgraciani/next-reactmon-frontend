import { ReactNode } from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

interface IAppProvider {
  children: ReactNode;
}

const AppProvider = ({ children }: IAppProvider): JSX.Element => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
