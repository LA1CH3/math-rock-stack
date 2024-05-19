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
      className="uppercase px-3 py-2 text-indigo-50 bg-black hover:bg-slate-800 text-bold button-shadow"
    >
      {children}
    </button>
  );
}
