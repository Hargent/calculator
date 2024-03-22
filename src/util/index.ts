import BodmasCalculator from "./bodmas";
import { Operations } from "../shared/enums/index";
import { StateDataType } from "../shared/types";

export const THEMES = {
  1: {
    base: "rgba(50, 30, 0, 0.8)",
    accent_button: "#ff9f0c",
    secondary_button: adjustLightness("rgba(50, 30, 0, 0.8)", 20),
    // secondary_button: colord("rgba(50, 30, 0, 0.8)").lighten(20),
    button: adjustLightness("rgba(50, 30, 0, 0.8)", 40)
  },
  2: {
    base: "rgba(0, 0, 0, 0.5)",
    accent_button: "#cc0000",
    secondary_button: adjustLightness("rgba(0, 0, 0, 0.5)", 20),
    button: adjustLightness("rgba(0, 0, 0, 0.5)", 40)
  }
};
export function adjustLightness(
  color: string,
  lightnessChange: number
): string {
  // Regex to match rgba values
  const rgbaMatch = color.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);

  if (!rgbaMatch) {
    throw new Error("Invalid RGBA color format");
  }

  const red = parseInt(rgbaMatch[1], 10);
  const green = parseInt(rgbaMatch[2], 10);
  const blue = parseInt(rgbaMatch[3], 10);
  const alpha = parseFloat(rgbaMatch[4]);

  // Convert to HSL
  const hsl = rgbToHsl(red, green, blue);

  // Adjust lightness by percentage
  hsl[2] = Math.min(100, Math.max(0, hsl[2] + lightnessChange));

  // Convert back to RGBA
  const rgba = hslToRgb(hsl[0], hsl[1], hsl[2]);

  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${alpha})`;
}
export function toStandardForm(number: number): string {
  if (`${number}`.length <= 7) return `${number}`;
  const exponent = Math.floor(Math.log10(Math.abs(number)));
  const significantDigits = (number / Math.pow(10, exponent)).toFixed(2);
  return `${significantDigits}e${exponent}`;
}
export const isLightColor = (color: string) => {
  // Calculate lightness using HSL conversion (more accurate)
  // You might need to adjust the threshold value based on your colors
  const hsl = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-1.]+))?\)/);
  if (!hsl) return false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, s, l, __] = hsl.map(Number);
  return (l + s) / 2 > 128; // Threshold for light colors
};
export function generateColorClass(
  target: "bg" | "text" | "shadow" | "border",
  theme: number,
  complement: string
) {
  return ` ${target}-theme-${theme}-${complement}`;
}
// Helper functions for HSL conversion (replace with your preferred library if available)
function rgbToHsl(r: number, g: number, b: number): number[] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h! /= 6;
  }

  return [h! * 100, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number): number[] {
  h = h / 100;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    h = h + (h < 0 ? 6 : 0);
    const t = h + 1 / 3;
    const t3 = t + 1 / 3;
    const t6 = t - 1 / 3;

    r = colorize(p, q, t6);
    g = colorize(p, q, t);
    b = colorize(p, q, t3);
  }

  return [r * 255, g * 255, b * 255];
}

function colorize(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

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
