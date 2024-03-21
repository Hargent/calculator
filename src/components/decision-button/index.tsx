import { ACTION_TYPES, Decisions } from "../../shared/enums";

import { BsPlusSlashMinus } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import { TbHttpDelete } from "react-icons/tb";
import { useAppContext } from "../../context/use-app-context";
import { CalculatorButtons } from "../buttons";

type Props = {
  decision: keyof typeof Decisions;
  type: "primary" | "secondary" | "accent";
};
const DecisionIcons = {
  answer: <FaEquals size={20} />,
  clear: "AC",
  delete: <TbHttpDelete size={40} />,
  switch: <BsPlusSlashMinus size={40} />
};

export default function DecisionButton({ decision, type }: Props) {
  const { state, handleDispatch } = useAppContext();
  const ButtonComponent = CalculatorButtons[type];
  function handleMakeDecision(decision: keyof typeof Decisions) {
    handleDispatch({
      type: ACTION_TYPES.MAKE_DECISION,
      payload: { decision: decision }
    });
  }

  return (
    <div
      className={`w-full flex items-center justify-center border `}
      onClick={() => handleMakeDecision(decision)}
    >
      <ButtonComponent
        $themeNo={`${state.theme}`}
        className="w-full h-full text-center flex items-center justify-center text-lg"
      >
        {DecisionIcons[decision]}
      </ButtonComponent>
    </div>
  );
}
