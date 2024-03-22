/* eslint-disable no-unexpected-multiline */
import { ACTION_TYPES, Decisions } from "../shared/enums";
import { ActionType, StateType } from "../shared/types";
import { toStandardForm } from "../util";

import BodmasCalculator from "../util/bodmas";

// import { appData } from "../data/data";
export const initialState: StateType = {
  expression: "0",
  memory: "answer",
  theme: 1,
  exponential: false,
  decimal: false
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
          expression: `${toStandardForm(answer)}`
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
      if (
        `${state.expression}${action.payload.expression}`.split("").length > 36
      ) {
        return { ...state }; // Prevent exceeding limit
      }

      // Enforce value length limit (18 digits)

      if (state.expression === "0" && action.payload.expression === "-") {
        return {
          ...state,
          exponential: false,
          memory: "operation",
          expression: "-"
        };
      }
      if (
        Number(action.payload.expression) ||
        action.payload.expression === "."
      ) {
        if (
          `${state.expression}${action.payload.expression}`.split(" ")[
            // eslint-disable-next-line no-unexpected-multiline
            `${state.expression}${action.payload.expression}`.split(" ")
              .length - 1
          ].split("").length >= 18
        ) {
          return { ...state };
        }

        return {
          ...state,
          memory: "number",

          expression:
            state.memory === "answer" &&
            action.payload.expression !== "." &&
            !state.expression.split(" ").pop()?.split("").includes(".")
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
          if (
            `${state.expression}${action.payload.expression}`.split("").length >
            18
          ) {
            return { ...state };
          }
          return {
            ...state,
            memory: "number",

            expression: `${state.expression}${action.payload.expression}`
          };
        } else if (
          action.payload.expression === "-" &&
          state.memory === "operation" &&
          state.expression.split("")[state.expression.split("").length - 1] !==
            "-"
        ) {
          return {
            ...state,
            exponential: false,
            decimal: false,

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
            exponential: false,
            decimal: false,
            expression: `${state.expression} ${action.payload.expression} `
          };
        }
      }

    case ACTION_TYPES.SWITCH_THEME:
      return {
        ...state,
        theme: action.payload.theme
      };
    case ACTION_TYPES.EXPONENTIAL:
      if (state.exponential) return { ...state };
      if (
        !Number(
          state.expression.split("")[state.expression.split("").length - 1]
        )
      )
        return { ...state };
      return {
        ...state,
        memory: "operation",
        exponential: action.payload.exponential,
        expression: `${state.expression}e`
      };
    case ACTION_TYPES.DECIMAL:
      if (state.decimal) return { ...state };
      if (state.expression === "0")
        return {
          ...state,
          memory: "operation",
          decimal: action.payload.decimal,
          expression: `0.`
        };
      if (
        !Number(
          state.expression.split("")[state.expression.split("").length - 1]
        ) &&
        state.expression.split("")[state.expression.split("").length - 1] !==
          "0"
      )
        return { ...state };
      return {
        ...state,
        memory: "operation",
        decimal: action.payload.decimal,
        expression: `${state.expression}.`
      };
    default:
      throw new Error("404 error, No Reducer action type not found!");
  }
};

export default reducer;
