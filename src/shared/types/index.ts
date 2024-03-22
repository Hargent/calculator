import { ACTION_TYPES, Decisions } from "../enums";

// export type OperationsType = {
//   [key: string]: string;
// };
// export type DecisionsType = {
//   [key: string]: string;
// };
export type ActionType = {
  type: ACTION_TYPES;
  payload: {
    expression?: string;
    theme?: number;
    decision?: keyof typeof Decisions;
    exponential?: boolean;
    decimal?: boolean;
  };
};
// export type ActionType = {
//   type: ACTION_TYPES;
//   payload: {
//     number?: number;
//     operation?: keyof typeof Operations;
//     decision?: keyof typeof Decisions;
//     theme?: number;
//   };
// };
export type StateType = {
  expression: string;
  memory: string;
  theme: number;
  exponential: boolean;
  decimal: false;
};
// export type StateType = {
//   numbers: StateDataType[];
//   operations: StateDataType[];
//   answer: number;
//   memory: "answer" | "operation" | "number";
//   theme: number;
// };
export type StateDataType = {
  value: number | string;
  position: number;
};
export type AppContextType = {
  state: StateType;
  handleDispatch: (arg: ActionType) => void;
};
