import { ACTION_TYPES, Operations } from "../../shared/enums";
import { FaDivide, FaMinus, FaPlus, FaTimes } from "react-icons/fa";

import { MdOutlinePercent } from "react-icons/md";
import { THEMES } from "../../util";
import { colord } from "colord";
import { useAppContext } from "../../context/use-app-context";

type Props = {
  operation: keyof typeof Operations;
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
      <button className="w-full h-full text-center flex items-center justify-center ">
        {OperationsIcons[operation]}
      </button>
    </div>
  );
}
