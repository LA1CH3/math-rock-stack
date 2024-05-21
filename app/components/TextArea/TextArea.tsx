interface Props {
  label: string;
  name: string;
  required?: boolean;
}

export function TextArea({ label, name, required }: Props) {
  return (
    <div className="flex flex-col gap-1 max-w-sm">
      <label className="uppercase" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="border border-indigo-950 p-1"
        name={name}
        required={required}
        rows={5}
      />
    </div>
  );
}
