import { AppProps } from 'next/app';
import { useRef } from 'react';
import GlobalStyles from 'styles/global';
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'nprogress/nprogress.css';

import { Header } from 'components/Header';
import { HeaderAdmin } from 'components/HeaderAdmin';

import AppProvider from 'contexts';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

import { withAuth } from 'helpers/withAuth';

NProgress.configure({
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { asPath } = useRouter();

  const queryClientRef = useRef(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const showDefaultHeader = !asPath.startsWith(ApplicationRoutes.ADMIN.ROOT);
  return (
    <AppProvider>
      <QueryClientProvider client={queryClientRef.current}>
        {showDefaultHeader ? <Header /> : <HeaderAdmin />}
        <Component {...pageProps} />
        <GlobalStyles />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppProvider>
  );
}

export default withAuth(MyApp);
