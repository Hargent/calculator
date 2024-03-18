import { Operations } from "../../shared/enums";

type Props = {
  operation: keyof typeof Operations;
};

export default function OperationButton({ operation }: Props) {
  return (
    <div className="w-full flex items-center justify-center border">
      <button className="w-full text-center ">{Operations[operation]}</button>
    </div>
  );
}
