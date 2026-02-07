interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, value, onChange }: Props) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
