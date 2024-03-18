import { Decisions } from "../../shared/enums";

type Props = {
  decision: keyof typeof Decisions;
};

export default function DecisionButton({ decision }: Props) {
  return (
    <div className="w-full flex items-center justify-center border">
      <button className="w-full text-center ">{Decisions[decision]}</button>
    </div>
  );
}
