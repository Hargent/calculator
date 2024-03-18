import { ACTION_TYPES, Decisions } from "../../shared/enums";

import { THEMES } from "../../util";
import { colord } from "colord";
import { useAppContext } from "../../context/use-app-context";

type Props = {
  decision: keyof typeof Decisions;
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
      <button className="w-full text-center ">{Decisions[decision]}</button>
    </div>
  );
}
