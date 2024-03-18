import { ACTION_TYPES, Decisions, Operations } from "../enums";

// export type OperationsType = {
//   [key: string]: string;
// };
// export type DecisionsType = {
//   [key: string]: string;
// };
export type ActionType = {
  type: ACTION_TYPES;
  payload: {
    number?: number;
    operation?: keyof typeof Operations;
    decision?: keyof typeof Decisions;
    theme?: number;
  };
};
export type StateType = {
  numbers: StateDataType[];
  operations: StateDataType[];
  answer: number;
  memory: "answer" | "number" | "operation";
  theme: number;
};
export type StateDataType = {
  value: number | string;
  position: number;
};
export type AppContextType = {
  state: StateType;
  handleDispatch: (arg: ActionType) => void;
};
