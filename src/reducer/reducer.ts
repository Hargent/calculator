import { ACTION_TYPES, Decisions } from "../shared/enums";
import { ActionType, StateType } from "../shared/types";

import { calculate } from "../util";

// import { appData } from "../data/data";
export const initialState: StateType = {
  numbers: [],
  operations: [],
  answer: 0,
  memory: "answer"
};
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTION_TYPES.SAVE_OPERATION:
      // Handle saving a new operation
      if (!action.payload.operation) {
        return state; // No operation provided, do nothing
      }
      // Prevent concurrent operation without a value between
      if (state.memory === "operation") {
        return state;
      }
      return {
        ...state,
        memory: "operation", // Update memory state
        operations: [
          ...state.operations,
          {
            value: action.payload.operation, // Add operation to list
            position: state.operations.length || 0
          }
        ]
      };
    case ACTION_TYPES.SAVE_VALUE:
      // Handle saving a new numeric value
      if (!action.payload.number) {
        return state; // No number provided, do nothing
      }
      return {
        ...state,
        memory: "number",
        numbers: [
          ...state.numbers,
          { value: action.payload.number, position: state.numbers.length || 0 }
        ]
      };
    case ACTION_TYPES.MAKE_DECISION:
      // Handle user decisions (calculate, clear, delete, switch sign)
      if (!action.payload.decision) {
        return state;
      }

      if (Decisions[action.payload.decision] === Decisions.answer) {
        // Calculate answer based on stored numbers and operations
        return {
          ...state,
          memory: "answer",
          answer: calculate({
            numbers: state.numbers,
            operations: state.operations
          }),
          numbers: [],
          operations: []
        };
      }
      if (Decisions[action.payload.decision] === Decisions.clear) {
        // Clear all data and reset to initial state
        return {
          ...initialState
        };
      }
      if (Decisions[action.payload.decision] === Decisions.delete) {
        // Handle delete action based on last memory state
        if (state.memory === "answer") {
          return {
            ...state,
            memory: "answer",
            answer: 0
          };
        }
        if (state.memory === "operation") {
          return {
            ...state,
            memory: "operation",
            operations: state.operations.slice(0, state.operations.length - 1)
          };
        }
        if (state.memory === "number") {
          return {
            ...state,
            memory: "answer",
            numbers: state.numbers.slice(0, state.numbers.length - 1)
          };
        }
      }
      if (Decisions[action.payload.decision] === Decisions.switch) {
        // Switch sign of the current answer
        return {
          ...state,
          memory: "answer",
          answer: -1 * +state.answer
        };
      }
      return {
        ...state,
        answer: 0
      };

    default:
      throw new Error("404 error, No Reducer action type not found!");
  }
};

export default reducer;
