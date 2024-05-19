import { PropsWithChildren } from 'react';

interface Props {
  heading: string;
}

export function Page({ heading, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-4 mt-6 p-6  bg-slate-50 bg-opacity-50">
      <h2 className="text-6xl uppercase text-heading">{heading}</h2>
      <section>{children}</section>
    </div>
  );
}
