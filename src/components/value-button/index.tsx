import { ACTION_TYPES } from "../../shared/enums";
import { THEMES } from "../../util/index";
import { colord } from "colord";
import { useAppContext } from "../../context/use-app-context";

type Props = { value: number };

export default function ValueButton({ value }: Props) {
  const { state, handleDispatch } = useAppContext();
  const textClass = colord(
    THEMES[state.theme as keyof typeof THEMES].base
  ).isDark()
    ? "text-white"
    : "text-black";

  function handleSaveValue(value: string) {
    handleDispatch({
      type: ACTION_TYPES.SAVE_EXPRESSION,
      payload: { expression: value }
    });
  }
  return (
    <div
      className={`w-full flex items-center justify-center border ${textClass}`}
      onClick={() => handleSaveValue(value.toString())}
    >
      <button className="w-full text-center h-full">{value}</button>
    </div>
  );
}
