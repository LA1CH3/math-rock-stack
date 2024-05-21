import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const buttonClasses =
  'uppercase px-3 py-2 text-indigo-50 bg-black hover:bg-slate-800 text-bold button-shadow max-w-sm';

export function Button({
  type = 'button',
  children,
}: PropsWithChildren<Props>) {
  return (
    <button type={type} className={buttonClasses}>
      {children}
    </button>
  );
}
