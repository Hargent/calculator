import { ACTION_TYPES, Operations } from "../../shared/enums";

import { THEMES } from "../../util";
import { colord } from "colord";
import { useAppContext } from "../../context/use-app-context";

type Props = {
  operation: keyof typeof Operations;
};

export default function OperationButton({ operation }: Props) {
  const { state, handleDispatch } = useAppContext();
  const textClass = colord(
    THEMES[state.theme as keyof typeof THEMES].base
  ).isDark()
    ? "text-white"
    : "text-black";

  function handleSaveOperation(operation: string) {
    handleDispatch({
      type: ACTION_TYPES.SAVE_EXPRESSION,
      payload: { expression: operation }
    });
  }
  return (
    <div
      className={`w-full flex items-center justify-center border ${textClass}`}
      onClick={() => handleSaveOperation(Operations[operation])}
      // onClick={() => handleSaveOperation(operation)}
    >
      <button className="w-full text-center ">{Operations[operation]}</button>
    </div>
  );
}
