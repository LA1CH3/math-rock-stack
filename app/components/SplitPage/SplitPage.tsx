import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  heading: string;
  outlet: ReactNode;
}

export function SplitPage({
  heading,
  children,
  outlet,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row mt-6 flex-nowrap w-full">
      <div className="flex flex-col gap-4 p-6 bg-slate-50 bg-opacity-50 w-full sm:w-1/3">
        <h2 className="text-6xl uppercase text-heading">{heading}</h2>
        <section>{children}</section>
      </div>
      <div className="flex flex-col p-6 bg-slate-50 bg-opacity-50 w-full sm:w-2/3">
        {outlet}
      </div>
    </div>
  );
}
