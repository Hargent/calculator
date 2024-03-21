import { ACTION_TYPES, Decisions } from "../../shared/enums";

import { BsPlusSlashMinus } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import { TbHttpDelete } from "react-icons/tb";
import { generateColorClass } from "../../util";
import { useAppContext } from "../../context/use-app-context";

type Props = {
  decision: keyof typeof Decisions;
};
const DecisionIcons = {
  answer: <FaEquals size={20} />,
  clear: "AC",
  delete: <TbHttpDelete size={40} />,
  switch: <BsPlusSlashMinus size={40} />
};

export default function DecisionButton({ decision }: Props) {
  const { state, handleDispatch } = useAppContext();

  function handleMakeDecision(decision: keyof typeof Decisions) {
    handleDispatch({
      type: ACTION_TYPES.MAKE_DECISION,
      payload: { decision: decision }
    });
  }
  return (
    <div
      className={`w-full flex items-center justify-center border ${generateColorClass("text", state.theme, "text-color")}`}
      onClick={() => handleMakeDecision(decision)}
    >
      <button className="w-full text-center flex items-center justify-center text-lg">
        {DecisionIcons[decision]}
      </button>
    </div>
  );
}
