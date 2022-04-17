import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactPath?: boolean;
}

export const ActiveLink = ({children, shouldMatchExactPath = false, ...rest}: ActiveLinkProps) => {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExactPath && asPath === rest.href || asPath === rest.as) {
    isActive = true;
  }

  if (!shouldMatchExactPath &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.500' : 'gray.50',
      })}
    </Link>
  );
};
