import { StateDataType } from "../shared/types";

export const THEMES = {
  1: {
    base: "rgba(50, 30, 0, 0.8)",
    accent_button: "#ff9f0c",
    secondary_button: getLighterColor("rgba(50, 30, 0, 0.8)", 20),
    button: getLighterColor("rgba(50, 30, 0, 0.8)", 40),
    text: "white"
  },
  2: {
    base: "rgba(0, 0, 0, 0.5)",
    accent_button: "#cc0000",
    secondary_button: getLighterColor("rgba(0, 0, 0, 0.5)", 20),
    button: getLighterColor("rgba(0, 0, 0, 0.5)", 40),
    text: "black"
  }
};
export function getLighterColor(
  colorString: string,
  percentLighter: number
): string {
  // Check if valid rgba format
  const colorRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-1.]+))?\)$/;
  const rgbaMatch = colorString.match(colorRegex);
  if (!rgbaMatch) {
    throw new Error("Invalid RGBA color format provided.");
  }

  // Extract color components as integers
  const red: number = parseInt(rgbaMatch[1], 10);
  const green: number = parseInt(rgbaMatch[2], 10);
  const blue: number = parseInt(rgbaMatch[3], 10);
  const alpha: number = parseFloat(rgbaMatch[4] || "1"); // Default to 1 if no alpha provided

  // Calculate lighter values with saturation check
  const lighterRed = Math.min(
    255,
    red + Math.round((255 * percentLighter) / 100)
  );
  const lighterGreen = Math.min(
    255,
    green + Math.round((255 * percentLighter) / 100)
  );
  const lighterBlue = Math.min(
    255,
    blue + Math.round((255 * percentLighter) / 100)
  );

  // Return the lighter color in rgba format
  return `rgba(${lighterRed}, ${lighterGreen}, ${lighterBlue}, ${alpha})`;
}
export function calculate({
  numbers,
  operations
}: {
  numbers: StateDataType[];
  operations: StateDataType[];
}) {
  const solution = 0;
  console.log(numbers, operations);
  return solution;
}
