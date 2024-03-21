import DecisionButton from "../components/decision-button";
import OperationButton from "../components/operation-button";
import ThemeSwitcher from "../components/theme-switcher";
import ValueButton from "../components/value-button";

import { useAppContext } from "../context/use-app-context";

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
          <div
            className={` row-span-2 w-full h-full flex items-end justify-end text-[40px] font-light p-2  flew overflow-hidden text-ellipsis `}
          >
            {state.expression}
          </div>
          <div className="grid grid-cols-4 row-start-3 row-end-8">
            <div className="grid grid-rows-5 col-span-3 ">
              <div className=" grid grid-cols-3 row-span-1  ">
                <DecisionButton decision="clear" />
                <DecisionButton decision="switch" />
                <OperationButton operation="modulo" />
              </div>
              <div className=" grid grid-rows-4 row-start-2 row-end-6 ">
                <div className="grid grid-cols-3  ">
                  <ValueButton value={7} />
                  <ValueButton value={8} />
                  <ValueButton value={9} />
                </div>
                <div className="grid grid-cols-3  ">
                  <ValueButton value={4} />
                  <ValueButton value={5} />
                  <ValueButton value={6} />
                </div>
                <div className="grid grid-cols-3  ">
                  <ValueButton value={1} />
                  <ValueButton value={2} />
                  <ValueButton value={3} />
                </div>
                <div className="grid grid-cols-3  ">
                  <ValueButton value={0} />
                  <DecisionButton decision="delete" />
                  <OperationButton operation="decimal" />
                </div>
              </div>
            </div>
            <div className={`grid grid-rows-5 col-start-4 col-end-5  `}>
              <OperationButton operation={"divide"} />
              <OperationButton operation={"multiply"} />
              <OperationButton operation="minus" />
              <OperationButton operation="plus" />
              <DecisionButton decision="answer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
