class BodmasCalculator {
  // Operator precedence lookup object
  private readonly operatorPrec: { [key: string]: number } = {
    "/": 2,
    x: 2,
    "%": 2, // Add modulo with precedence 2 (same as multiplication/division)
    "+": 1,
    "-": 1
  };

  // Determine operator precedence
  private determineOperatorPrecedence(x: string, y: string): number {
    if (y === "(") return -1;
    return this.operatorPrec[x] - this.operatorPrec[y] || 0; // Handle undefined precedence
  }

  // Apply operation
  private evaluate(a: number, b: number, op: string): number {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "x":
        return a * b;
      case "/":
        return a / b;
      case "%":
        return a % b;

      default:
        throw new Error(`Unsupported operator: ${op}`);
    }
  }

  // Evaluate expression (using shunting-yard algorithm)
  public calculate(exp: string): number {
    const operationStack: string[] = []; // Operator stack
    const operandStack: number[] = []; // Operand stack

    for (const char of exp.split(" ")) {
      if (!isNaN(parseFloat(char))) {
        // Push number to operand stack
        operandStack.push(parseFloat(char));
      } else if (char === ")") {
        // Pop and evaluate operators until opening parenthesis is found
        while (
          operationStack.length > 0 &&
          operationStack[operationStack.length - 1] !== "("
        ) {
          this.evaluate2(operationStack, operandStack);
        }
        operationStack.pop(); // Pop the opening parenthesis
      } else if (
        operationStack.length === 0 ||
        this.determineOperatorPrecedence(
          char,
          operationStack[operationStack.length - 1]
        ) < 0
      ) {
        // Push operator to operator stack if lower precedence or empty stack
        operationStack.push(char);
      } else {
        // Pop and evaluate operators with higher precedence than current operator
        while (
          operationStack.length > 0 &&
          this.determineOperatorPrecedence(
            char,
            operationStack[operationStack.length - 1]
          ) > 0
        ) {
          this.evaluate2(operationStack, operandStack);
        }
        operationStack.push(char);
      }
    }

    // Evaluate remaining operators after processing all tokens
    while (operationStack.length > 0) {
      this.evaluate2(operationStack, operandStack);
    }

    // Return the final result from the operand stack
    if (operandStack.length !== 1) {
      throw new Error("Invalid expression"); // Handle invalid expressions
    }

    return operandStack[0];
  }

  // Helper function to perform operation and push result to operand stack
  private evaluate2(operationStack: string[], operandStack: number[]): void {
    const a = operandStack.pop()!;
    const b = operandStack.pop()!;
    const op = operationStack.pop()!;
    operandStack.push(this.evaluate(b, a, op)); // Reversed for correct evaluation order
  }
}
export default BodmasCalculator;
