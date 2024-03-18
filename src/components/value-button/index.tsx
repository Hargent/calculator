type Props = { value: number };

export default function ValueButton({ value }: Props) {
  return (
    <div className="w-full flex items-center justify-center border">
      <button className="w-full text-center ">{value}</button>
    </div>
  );
}
