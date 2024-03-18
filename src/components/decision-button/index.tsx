import { Decisions } from "../../shared/enums";

type Props = {
  decision: keyof typeof Decisions;
};

export default function DecisionButton({ decision }: Props) {
  return (
    <div>
      <button>{Decisions[decision]}</button>
    </div>
  );
}
