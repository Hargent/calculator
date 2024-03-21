import { ACTION_TYPES } from "../../shared/enums";
import { useAppContext } from "../../context/use-app-context";
import { CalculatorButtons } from "../buttons";

type Props = { value: number; type: "primary" | "secondary" | "accent" };

export default function ValueButton({ value, type }: Props) {
  const { state, handleDispatch } = useAppContext();

  function handleSaveValue(value: string) {
    handleDispatch({
      type: ACTION_TYPES.SAVE_EXPRESSION,
      payload: { expression: value }
    });
  }

  const ButtonComponent = CalculatorButtons[type];
  // const ButtonComponent =
  // type === 'primary'
  //   ? PrimaryButton
  //   : type === 'secondary'
  //   ? SecondaryButton
  //   : AccentButton;

  return (
    <div
      className={`w-full flex items-center justify-center border `}
      onClick={() => handleSaveValue(value.toString())}
    >
      <ButtonComponent
        $themeNo={`${state.theme}`}
        className={`w-full text-center h-full text-xl`}
      >
        {value}
      </ButtonComponent>
    </div>
  );
}
