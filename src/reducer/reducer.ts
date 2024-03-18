import { ACTION_TYPES, Decisions } from "../shared/enums";
import { ActionType, StateType } from "../shared/types";

import BodmasCalculator from "../util/bodmas";

// import { appData } from "../data/data";
export const initialState: StateType = {
  expression: "0",
  memory: "answer",
  theme: 1
};
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTION_TYPES.MAKE_DECISION:
      // Handle user decisions (calculate, clear, delete, switch sign)
      if (!action.payload.decision) {
        return { ...state };
      }

      if (Decisions[action.payload.decision] === Decisions.answer) {
        if (state.memory === "answer") {
          return { ...state };
        }
        // Calculate answer based on stored numbers and operations
        const answer = new BodmasCalculator().calculate(state.expression);
        return {
          ...state,
          memory: "answer",
          expression: `${answer}`
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

        const newExpression = [
          ...(state.expression?.split(" ") ?? [state.expression])
        ];

        console.log(newExpression);
        const lastExp = newExpression.pop();
        const isNumber = Number(lastExp);
        const toDelete = lastExp?.split("");
        toDelete?.pop();
        let finalExpression = [...newExpression];
        if (toDelete?.length) {
          finalExpression = [...finalExpression, toDelete.join("")];
        }
        return {
          ...state,
          expression:
            finalExpression.length > 0 ? finalExpression.join(" ") : "0",
          memory:
            finalExpression.length > 0
              ? isNumber
                ? "number"
                : "operation"
              : "answer"
        };
      }

      if (Decisions[action.payload.decision] === Decisions.switch) {
        // Switch sign of the current answer
        if (state.memory !== "answer") {
          return { ...state };
        }
        return {
          ...state,
          memory: "answer",
          expression: `${Number(state.expression) * -1}`
        };
      }

      return {
        ...state,
        answer: 0
      };
    case ACTION_TYPES.SAVE_EXPRESSION:
      if (state.expression === "0" && action.payload.expression === "-") {
        return {
          ...state,
          memory: "operation",
          expression: "-"
        };
      }
      if (
        Number(action.payload.expression) ||
        action.payload.expression === "."
      ) {
        return {
          ...state,
          memory: "number",
          expression:
            state.memory === "answer" && action.payload.expression !== "."
              ? `${action.payload.expression}`
              : `${[...(state.expression?.split("") ?? [state.expression])].pop() === "" ? `${state.expression}0` : state.expression}${action.payload.expression}`
        };
      } else {
        // const exp = (state.expression?.split(" ") ?? ([] || [])).filter(
        //   (i) => i !== ""
        // );
        // const lastExp = exp.at(exp.length - 1);
        if (state.expression === "0" && action.payload.expression === "0") {
          return {
            ...state
          };
        } else if (
          state.expression !== "0" &&
          action.payload.expression === "0"
        ) {
          return {
            ...state,
            memory: "number",
            expression: `${state.expression}${action.payload.expression}`
          };
        } else if (
          action.payload.expression === "-" &&
          state.memory === "operation"
        ) {
          return {
            ...state,
            memory: "operation",
            expression: `${state.expression}${action.payload.expression}`
          };
        } else {
          if (state.memory === "operation") {
            return {
              ...state
            };
          }
          return {
            ...state,
            memory: "operation",
            expression: `${state.expression} ${action.payload.expression} `
          };
        }
      }

    case ACTION_TYPES.SWITCH_THEME:
      return {
        ...state,
        theme: action.payload.theme
      };
    default:
      throw new Error("404 error, No Reducer action type not found!");
  }
};

export default reducer;
