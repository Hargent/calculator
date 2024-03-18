import { Operations } from "../../shared/enums";

type Props = {
  operation: keyof typeof Operations;
};

export default function OperationButton({ operation }: Props) {
  return (
    <div>
      <button>{Operations[operation]}</button>
    </div>
  );
}
