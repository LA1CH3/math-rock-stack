import { PropsWithChildren } from 'react';
import { Link as RouterLink } from '@remix-run/react';
import { buttonClasses } from '../Button/Button';

interface Props {
  external?: boolean;
  to: string;
  button?: boolean;
}

const linkClasses = 'uppercase hover:underline underline-offset-2';

export function Link({
  external,
  to,
  button,
  children,
}: PropsWithChildren<Props>) {
  const classes = button ? buttonClasses : linkClasses;

  return external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  ) : (
    <RouterLink to={to} className={classes}>
      {children}
    </RouterLink>
  );
}
