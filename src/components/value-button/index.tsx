type Props = { value: number };

export default function ValueButton({ value }: Props) {
  return (
    <div>
      <button>{value}</button>
    </div>
  );
}
