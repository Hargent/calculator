import styled from "styled-components";
import DecisionButton from "../components/decision-button";
import OperationButton from "../components/operation-button";
import ThemeSwitcher from "../components/theme-switcher";
import ValueButton from "../components/value-button";

import { useAppContext } from "../context/use-app-context";
import { css } from "styled-components";
import { DefaultTheme } from "styled-components";
interface DisplayProps {
  readonly $themeNo: string;
}
const CalcDisplay = styled.div<DisplayProps & DefaultTheme>`
  ${({ theme, $themeNo }) => css`
    background-color: ${theme[$themeNo].base};
  `};
`;
function App() {
  const { state } = useAppContext();
  return (
    // <div className={` bg-theme-1-primary`}>
    <div className={``}>
      <div className="w-full h-screen flex items-center flex-col justify-center ">
        <div className=" min-w-[250px] max-w-[600px] w-4/5 flex items-end justify-end py-6">
          <ThemeSwitcher />
        </div>
        <div className=" min-w-[250px] max-w-[600px] w-4/5  h-[600px] grid grid-rows-7 overflow-clip">
          <CalcDisplay
            $themeNo={`${state.theme}`}
            className={` row-span-2 w-full h-full flex items-end justify-end text-[40px] font-light p-2  flew overflow-hidden text-ellipsis text-white `}
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
                  <OperationButton type="primary" operation="decimal" />
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
