// import { ACTION_TYPES, Decisions } from "../shared/enums";
// import { ActionType, StateType } from "../shared/types";

// import { calculate } from "../util";

// // import { appData } from "../data/data";
// export const initialState: StateType = {
//   numbers: [],
//   operations: [],
//   answer: 0,
//   memory: "answer",
//   theme: 1
// };
// const reducer = (state: StateType, action: ActionType) => {
//   switch (action.type) {
//     case ACTION_TYPES.SAVE_OPERATION:
//       // Handle saving a new operation
//       if (!action.payload.operation) {
//         return { ...state }; // No operation provided, do nothing
//       }
//       // Prevent concurrent operation without a value between

//       if (state.memory === "operation") {
//         if (action.payload.operation === "minus") {
//           return {
//             ...state,
//             memory: "operation",
//             numbers: [
//               ...state.numbers,
//               {
//                 value: "-",
//                 position: state.numbers.length || 0
//               }
//             ]
//           };
//         }
//         return { ...state };
//       }
//       if (state.memory === "answer") {
//         return {
//           ...state,
//           memory: "operation",
//           numbers: [{ value: state.answer, position: 0 }],
//           operations: [
//             ...state.operations,
//             {
//               value: action.payload.operation, // Add operation to list
//               position: state.operations.length || 0
//             }
//           ]
//         };
//       }
//       return {
//         ...state,
//         memory: "operation", // Update memory state
//         operations: [
//           ...state.operations,
//           {
//             value: action.payload.operation, // Add operation to list
//             position: state.operations.length || 0
//           }
//         ]
//       };
//     case ACTION_TYPES.SAVE_VALUE:
//       // Handle saving a new numeric value

//       if (action.payload.number !== 0 && !action.payload.number) {
//         return { ...state }; // No number provided, do nothing
//       }
//       if (state.memory === "number") {
//         console.log(action.payload.number);
//         const nums = [...state.numbers];
//         const lastNum = nums.pop();
//         console.log(lastNum);

//         if (action.payload.number === 0) {
//           if (
//             state.operations.at(state.operations.length - 1)?.value !==
//             "decimal"
//           ) {
//             return {
//               ...state
//             };
//           }
//           const newNum = {
//             ...lastNum,
//             value: `${lastNum!.value}0`
//           };
//           return {
//             ...state,
//             memory: "number",
//             numbers: [...nums, newNum]
//           };
//         }
//         const newNum = {
//           ...lastNum,
//           value: Number(lastNum!.value) * 10 + action.payload.number
//         };
//         return {
//           ...state,
//           memory: "number",
//           numbers: [...nums, newNum]
//         };
//       }
//       if (state.memory === "operation") {
//         const nums = [...state.numbers];
//         const lastNum = nums.pop();

//         if (Number(lastNum?.value) === -1) {
//           return {
//             ...state,
//             memory: "number",
//             numbers: [
//               ...nums,
//               {
//                 value: action.payload.number * -1,
//                 position: state.numbers.length || 0
//               }
//             ]
//           };
//         } else {
//           return {
//             ...state,
//             memory: "number",
//             numbers: [
//               ...state.numbers,
//               {
//                 value: action.payload.number,
//                 position: state.numbers.length || 0
//               }
//             ]
//           };
//         }
//       }
//       return {
//         ...state,
//         memory: "number",
//         numbers: [
//           ...state.numbers,
//           { value: action.payload.number, position: state.numbers.length || 0 }
//         ]
//       };
//     case ACTION_TYPES.MAKE_DECISION:
//       // Handle user decisions (calculate, clear, delete, switch sign)
//       if (!action.payload.decision) {
//         return { ...state };
//       }

//       if (Decisions[action.payload.decision] === Decisions.answer) {
//         // Calculate answer based on stored numbers and operations
//         if (state.memory !== "number") {
//           return { ...state };
//         }

//         return {
//           ...state,
//           memory: "answer",
//           answer: calculate({
//             numbers: state.numbers,
//             operations: state.operations
//           }),
//           numbers: [],
//           operations: []
//         };
//       }
//       if (Decisions[action.payload.decision] === Decisions.clear) {
//         // Clear all data and reset to initial state
//         return {
//           ...initialState
//         };
//       }
//       if (Decisions[action.payload.decision] === Decisions.delete) {
//         // Handle delete action based on last memory state

//         if (state.memory === "answer") {
//           return {
//             ...state,
//             memory: "answer",
//             answer: 0
//           };
//         }
//         if (state.memory === "operation") {
//           return {
//             ...state,
//             memory: "number",
//             operations: state.operations.slice(0, state.operations.length - 1)
//           };
//         }
//         if (state.memory === "number") {
//           const nums = [...state.numbers];
//           const lastNum = nums.pop();

//           if (!lastNum) {
//             return {
//               ...state
//             };
//           }

//           if (lastNum.value === "-" && state.operations.length > 0) {
//             return {
//               ...state,
//               memory: "operation",
//               numbers: [...nums]
//             };
//           }
//           if (Number(lastNum.value) <= 9 && state.operations.length > 0) {
//             if (nums.at(nums.length - 1)?.value === "-") {
//               return {
//                 ...state,
//                 memory: "number",
//                 numbers: [...nums]
//               };
//             }
//             return {
//               ...state,
//               memory: "operation",
//               numbers: [...nums]
//             };
//           }
//           const newValue =
//             (Number(lastNum.value) - (Number(lastNum.value) % 10)) / 10;
//           return {
//             ...state,
//             memory: "number",
//             numbers: [...nums, { ...lastNum, value: newValue }]
//           };
//         }
//       }
//       if (Decisions[action.payload.decision] === Decisions.switch) {
//         // Switch sign of the current answer
//         if (state.memory !== "answer") {
//           return { ...state };
//         }
//         return {
//           ...state,
//           memory: "answer",
//           answer: -1 * +state.answer
//         };
//       }

//       return {
//         ...state,
//         answer: 0
//       };
//     case ACTION_TYPES.SWITCH_THEME:
//       return {
//         ...state,
//         theme: action.payload.theme
//       };
//     default:
//       throw new Error("404 error, No Reducer action type not found!");
//   }
// };

// export default reducer;
