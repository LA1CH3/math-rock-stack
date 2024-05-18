interface Props {
  label: string;
  name: string;
  type?: string;
}

export function TextField({ label, name, type = 'text' }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="uppercase" htmlFor={name}>
        {label}
      </label>
      <input className="border border-indigo-950 p-1" type={type} name={name} />
    </div>
  );
}
