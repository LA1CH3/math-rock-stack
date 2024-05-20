import { PropsWithChildren } from 'react';
import { Link as RouterLink } from '@remix-run/react';

interface Props {
  external?: boolean;
  to: string;
}

export function Link({ external, to, children }: PropsWithChildren<Props>) {
  const classes = 'uppercase hover:underline underline-offset-2';

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
