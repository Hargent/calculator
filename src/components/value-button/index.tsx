import { ACTION_TYPES } from "../../shared/enums";
import { useAppContext } from "../../context/use-app-context";

type Props = { value: number };

export default function ValueButton({ value }: Props) {
  const { state, handleDispatch } = useAppContext();

  function handleSaveValue(value: string) {
    handleDispatch({
      type: ACTION_TYPES.SAVE_EXPRESSION,
      payload: { expression: value }
    });
  }
  console.log(state);
  return (
    <div
      className={`w-full flex items-center justify-center border `}
      onClick={() => handleSaveValue(value.toString())}
    >
      <button className={`w-full text-center h-full text-xl text-current `}>
        {value}
      </button>
    </div>
  );
}
