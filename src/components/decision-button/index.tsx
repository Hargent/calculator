import { ACTION_TYPES, Decisions } from "../../shared/enums";

import { BsPlusSlashMinus } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import { THEMES } from "../../util";
import { TbHttpDelete } from "react-icons/tb";
import { colord } from "colord";
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
  const textClass = colord(
    THEMES[state.theme as keyof typeof THEMES].base
  ).isDark()
    ? "text-white"
    : "text-black";

  function handleMakeDecision(decision: keyof typeof Decisions) {
    handleDispatch({
      type: ACTION_TYPES.MAKE_DECISION,
      payload: { decision: decision }
    });
  }
  return (
    <div
      className={`w-full flex items-center justify-center border ${textClass}`}
      onClick={() => handleMakeDecision(decision)}
    >
      <button className="w-full text-center flex items-center justify-center text-lg">
        {DecisionIcons[decision]}
      </button>
    </div>
  );
}
