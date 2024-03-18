import DecisionButton from "../components/decision-button";
import OperationButton from "../components/operation-button";
import ValueButton from "../components/value-button";

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className=" min-w-[250px] max-w-[600px] w-4/5 bg-red-300 h-[600px] grid grid-rows-7">
        <div className="bg-red-500 row-span-2 w-full h-full flex items-end justify-end text-[80px] font-light p-2">
          0
        </div>
        <div className="grid grid-cols-4 row-start-3 row-end-8">
          <div className="grid grid-rows-5 col-span-3 bg-green-600 ">
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
          <div className="grid grid-flow-row col-start-4 col-end-5 bg-purple-600  ">
            <OperationButton operation={"divide"} />
            <OperationButton operation={"multiply"} />
            <OperationButton operation="minus" />
            <OperationButton operation="plus" />
            <DecisionButton decision="answer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
