import {
  createContext,
  useCallback,
  ReactNode,
  useState,
  useContext,
} from 'react';
import Cookies from 'js-cookie';

import { api } from 'services/api';

import { IUser } from 'interfaces/User';

interface ISignInCredentialsProps {
  email: string;
  password: string;
}

interface IAuthContextProps {
  user: IUser;
  signIn(credentials: ISignInCredentialsProps): Promise<void>;
  signOut(): void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthStateProps {
  token: string;
  user: IUser;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

const AuthProvider = ({ children }: IAuthProviderProps): JSX.Element => {
  const [data, setData] = useState<IAuthStateProps>(() => {
    const token = Cookies.get('reactmon_token');
    const user = Cookies.get('reactmon_user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthStateProps;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    Cookies.set('reactmon_token', token, {
      expires: 1,
    });
    Cookies.set('reactmon_user', JSON.stringify(user), {
      expires: 1,
    });

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('reactmon_token');
    Cookies.remove('reactmon_user');

    api.defaults.headers.authorization = '';

    setData({} as IAuthStateProps);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
