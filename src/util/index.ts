import BodmasCalculator from "./bodmas";
import { Operations } from "../shared/enums/index";
import { StateDataType } from "../shared/types";
import { colord } from "colord";

export const THEMES = {
  1: {
    base: "rgba(50, 30, 0, 0.8)",
    accent_button: "#ff9f0c",
    secondary_button: colord("rgba(50, 30, 0, 0.8)").lighten(0.2),
    button: colord("rgba(50, 30, 0, 0.8)").lighten(0.4)
  },
  2: {
    base: "rgba(0, 0, 0, 0.5)",
    accent_button: "#cc0000",
    secondary_button: colord("rgba(0, 0, 0, 0.5)").lighten(0.2),
    button: colord("rgba(0, 0, 0, 0.5)").lighten(0.4)
  }
};

export function calculate({
  numbers,
  operations
}: {
  numbers: StateDataType[];
  operations: StateDataType[];
}) {
  // Build the expression string
  const expression = calcExpression(numbers, operations);

  // Evaluate the expression using BODMAS logic
  return new BodmasCalculator().calculate(expression);
}
// Function to handle operator precedence (BODMAS)
// function evaluateBODMAS(expr: string): number {
//   const stack: number[] = [];
//   const operators: { [key: string]: number } = {
//     "+": 1,
//     "-": 1,
//     "*": 2,
//     "/": 2,
//     "%": 2
//   }; // Operator precedence
//   // 2+3-4*5
//   for (let i = 0; i < expr.length; i++) {
//     const char = expr[i];
//     if (!isNaN(Number(char))) {
//       // Push operand (number) to stack
//       stack.push(Number(char));
//     } else if (char in operators) {
//       const currentOperator = operators[char]; //1
//       const operand2 = stack.pop(); //2
//       let operand1 = stack.pop(); //undefined

//       // Handle precedence: pop and evaluate higher precedence operators
//       while (
//         stack.length > 0 &&
//         operators[stack[stack.length - 1]] >= currentOperator
//       ) {
//         const prevOperator = stack.pop()!;
//         const prevOperand2 = stack.pop()!;
//         operand1 = evaluate(prevOperator, prevOperand2, operand1!);
//       }

//       stack.push(evaluate(char, operand1!, operand2!));
//     }
//   }

//   return stack.pop()!;
// }
// function evaluate(
//   operator: string,
//   operand1: number,
//   operand2: number
// ): number {
//   switch (operator) {
//     case "+":
//       return operand1 + operand2;
//     case "-":
//       return operand1 - operand2;
//     case "*":
//       return operand1 * operand2;
//     case "/":
//       return operand1 / operand2;
//     case "%":
//       return operand1 % operand2;
//     default:
//       throw new Error("Unsupported operator");
//   }
// }
export function calcExpression(
  numbers: StateDataType[],
  operations: StateDataType[]
): string {
  let expression = "";

  for (let i = 0; i < numbers.length; i++) {
    expression += numbers[i].value.toString(); // Add the current number

    if (i < operations.length) {
      // Check if there's an operation for this position
      expression += ` ${Operations[operations[i].value as keyof typeof Operations]} `; // Add the operation
    }
  }

  return expression;
}
