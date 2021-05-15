import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import { cloneElement, ReactElement } from 'react';

import { IActiveLinkProps } from './ActiveLink.types';

const ActiveLink = ({
  children,
  activeClassName,
  ...rest
}: IActiveLinkProps): ReactElement => {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : '';
  return (
    <NextLink {...rest}>
      {cloneElement(children, {
        className,
      })}
    </NextLink>
  );
};

export default ActiveLink;
