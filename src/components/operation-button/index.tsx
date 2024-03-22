import { ACTION_TYPES, Operations } from "../../shared/enums";
import { FaDivide, FaMinus, FaPlus, FaTimes } from "react-icons/fa";

import { MdOutlinePercent } from "react-icons/md";
import { useAppContext } from "../../context/use-app-context";
import { CalculatorButtons } from "../buttons";

type Props = {
  operation: keyof typeof Operations;
  type: "primary" | "secondary" | "accent";
};
const OperationsIcons = {
  plus: <FaPlus size={20} />,
  minus: <FaMinus size={20} />,
  multiply: <FaTimes size={20} />,
  divide: <FaDivide size={20} />,
  modulo: <MdOutlinePercent size={40} />,
  decimal: <Point />
};
function Point() {
  return <span className=" font-bold text-xl text-current">.</span>;
}
export default function OperationButton({ operation, type }: Props) {
  const ButtonComponent = CalculatorButtons[type];
  const { state, handleDispatch } = useAppContext();

  function handleSaveOperation(operation: string) {
    handleDispatch({
      type: ACTION_TYPES.SAVE_EXPRESSION,
      payload: { expression: operation }
    });
  }

  return (
    <div
      className={`w-full flex items-center justify-center border cursor-pointer `}
      onClick={() => handleSaveOperation(Operations[operation])}
      // onClick={() => handleSaveOperation(operation)}
    >
      <ButtonComponent
        $themeNo={`${state.theme}`}
        className="w-full h-full text-center flex items-center justify-center"
      >
        {OperationsIcons[operation]}
      </ButtonComponent>
    </div>
  );
}
