export enum Operations {
  plus = "+",
  minus = "-",
  multiply = "x",
  divide = "/",
  modulo = "%",
  decimal = "."
}
export enum Decisions {
  answer = "=",
  clear = "AC",
  "delete" = "CE",
  "switch" = "+-"
}
export enum ACTION_TYPES {
  SAVE_VALUE = "calculator/save/value",
  SAVE_OPERATION = "calculator/save/operation",
  MAKE_DECISION = "calculator/make/decision",
  SWITCH_THEME = "calculator/theme/switch"
}
