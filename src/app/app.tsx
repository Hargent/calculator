import styled from "styled-components";
import DecisionButton from "../components/decision-button";
import OperationButton from "../components/operation-button";
import ThemeSwitcher from "../components/theme-switcher";
import ValueButton from "../components/value-button";

import { useAppContext } from "../context/use-app-context";
import { css } from "styled-components";
import { DefaultTheme } from "styled-components";
import { ACTION_TYPES } from "../shared/enums";
import { CalculatorButtons } from "../components/buttons";
interface DisplayProps {
  readonly $themeNo: string;
}
const CalcDisplay = styled.div<DisplayProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].base};
  `};
`;
function App() {
  const { state, handleDispatch } = useAppContext();
  function handleExponential() {
    handleDispatch({
      type: ACTION_TYPES.EXPONENTIAL,
      payload: { exponential: true }
    });
  }
  function handleDecimal() {
    handleDispatch({
      type: ACTION_TYPES.DECIMAL,
      payload: { decimal: true }
    });
  }
  return (
    // <div className={` bg-theme-1-primary`}>
    <div className={``}>
      <div className="w-full h-screen flex items-center flex-col justify-center ">
        <div className=" min-w-[250px] max-w-[600px] w-4/5 flex items-end justify-between p-6">
          <div className="flex items-center justify-start w-full">
            <button
              onClick={handleExponential}
              className="font-bold px-12 py-[0.25rem] rounded-[50rem]  bg-black text-white text-[40px] flex items-center justify-center italic"
            >
              e
            </button>
          </div>
          <ThemeSwitcher />
        </div>
        <div className=" min-w-[250px] max-w-[600px] w-4/5  h-[600px] grid grid-rows-7 overflow-clip px-2">
          <CalcDisplay
            $themeNo={`${state.theme}`}
            className={` row-span-2 w-full  text-[60px] font-light p-2 overflow-hidden text-wrap text-white text-end flex items-end justify-end`}
          >
            {state.expression}
          </CalcDisplay>
          <div className="grid grid-cols-4 row-start-3 row-end-8">
            <div className="grid grid-rows-5 col-span-3 ">
              <div className=" grid grid-cols-3 row-span-1  ">
                <DecisionButton type="secondary" decision="clear" />
                <DecisionButton type="secondary" decision="switch" />
                <OperationButton type="secondary" operation="modulo" />
              </div>
              <div className=" grid grid-rows-4 row-start-2 row-end-6 ">
                <div className="grid grid-cols-3  ">
                  <ValueButton type="primary" value={7} />
                  <ValueButton type="primary" value={8} />
                  <ValueButton type="primary" value={9} />
                </div>
                <div className="grid grid-cols-3  ">
                  <ValueButton type="primary" value={4} />
                  <ValueButton type="primary" value={5} />
                  <ValueButton type="primary" value={6} />
                </div>
                <div className="grid grid-cols-3  ">
                  <ValueButton type="primary" value={1} />
                  <ValueButton type="primary" value={2} />
                  <ValueButton type="primary" value={3} />
                </div>
                <div className="grid grid-cols-3  ">
                  <ValueButton type="primary" value={0} />
                  <DecisionButton type="primary" decision="delete" />

                  <div
                    className={`w-full flex items-center justify-center border cursor-pointer h-full `}
                    onClick={handleDecimal}
                  >
                    <CalculatorButtons.primary
                      $themeNo={`${state.theme}`}
                      className="w-full h-full text-center flex items-center justify-center"
                    >
                      .
                    </CalculatorButtons.primary>
                  </div>
                </div>
              </div>
            </div>
            <div className={`grid grid-rows-5 col-start-4 col-end-5  `}>
              <OperationButton type="accent" operation={"divide"} />
              <OperationButton type="accent" operation={"multiply"} />
              <OperationButton type="accent" operation="minus" />
              <OperationButton type="accent" operation="plus" />
              <DecisionButton type="accent" decision="answer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
