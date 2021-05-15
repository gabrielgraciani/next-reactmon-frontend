import { useRouter } from 'next/router';
import React, { ElementType, useEffect } from 'react';
import Cookies from 'js-cookie';

import { ApplicationRoutes } from 'config/ApplicationRoutes';

export function withAuth(WrappedComponent: ElementType): ElementType {
  const Wrapper = (props: unknown) => {
    const router = useRouter();

    const token = Cookies.get('reactmon_token');
    const user = Cookies.get('reactmon_user');

    const hasSession = token && user;

    useEffect(() => {
      if (hasSession && router.asPath === ApplicationRoutes.LOGIN) {
        router.push(ApplicationRoutes.ADMIN.POKEMONS.LIST);
      }

      if (
        !hasSession &&
        router.asPath.startsWith(ApplicationRoutes.ADMIN.ROOT)
      ) {
        router.push(ApplicationRoutes.LOGIN);
      }
    }, [router, hasSession]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
