interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

export function TextField({ label, name, required, type = 'text' }: Props) {
  return (
    <div className="flex flex-col gap-1 max-w-sm">
      <label className="uppercase" htmlFor={name}>
        {label}
      </label>
      <input
        className="border border-indigo-950 p-1"
        type={type}
        name={name}
        required={required}
      />
    </div>
  );
}
