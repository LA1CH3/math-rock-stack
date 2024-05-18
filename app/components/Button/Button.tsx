import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export function Button({
  type = 'button',
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      className="border border-indigo-950 uppercase p-3 text-indigo-50 text-bold bg-indigo-900 hover:bg-indigo-800"
    >
      {children}
    </button>
  );
}
