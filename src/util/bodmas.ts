class BodmasCalculator {
  private readonly operatorPrec: { [key: string]: number } = {
    "/": 2,
    x: 2,
    "%": 2, // Add modulo with precedence 2 (same as multiplication/division)
    "+": 1,
    "-": 1
  };

  private isLeftAssociative(op: string): boolean {
    return op !== "^"; // ^ is right-associative, modify this condition as needed
  }

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

  public calculate(exp: string): number {
    const outputQueue: (number | string)[] = [];
    const operatorStack: string[] = [];

    const tokens = exp.split(" ");

    for (const token of tokens) {
      if (!isNaN(parseFloat(token))) {
        // Token is a number, push to output queue
        outputQueue.push(parseFloat(token));
      } else if (token in this.operatorPrec) {
        // Token is an operator
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "(" &&
          (this.operatorPrec[token] <
            this.operatorPrec[operatorStack[operatorStack.length - 1]] ||
            (this.operatorPrec[token] ===
              this.operatorPrec[operatorStack[operatorStack.length - 1]] &&
              this.isLeftAssociative(token)))
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.push(token);
      } else if (token === ",") {
        // Handle comma
        while (operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue.push(operatorStack.pop()!);
        }
      } else if (token === "(") {
        // Left parenthesis
        operatorStack.push(token);
      } else if (token === ")") {
        // Right parenthesis
        while (operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue.push(operatorStack.pop()!);
        }
        if (operatorStack[operatorStack.length - 1] === "(") {
          operatorStack.pop();
        }
      }
    }

    // Pop remaining operators from stack to output queue
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop()!);
    }

    // Evaluate postfix expression
    const operandStack: number[] = [];
    for (const token of outputQueue) {
      if (typeof token === "number") {
        operandStack.push(token);
      } else {
        const b = operandStack.pop()!;
        const a = operandStack.pop()!;
        operandStack.push(this.evaluate(a, b, token));
      }
    }

    // Return the final result from the operand stack
    if (operandStack.length !== 1) {
      throw new Error("Invalid expression");
    }
    return operandStack[0];
  }
}

export default BodmasCalculator;

// class BodmasCalculator {
//   // Operator precedence lookup object
//   private readonly operatorPrec: { [key: string]: number } = {
//     "/": 2,
//     x: 2,
//     "%": 2, // Add modulo with precedence 2 (same as multiplication/division)
//     "+": 1,
//     "-": 1
//   };

//   // Determine operator precedence
//   private determineOperatorPrecedence(x: string, y: string): number {
//     if (y === "(") return -1;
//     console.log(x, y, this.operatorPrec[x] - this.operatorPrec[y] || 0);
//     return this.operatorPrec[x] - this.operatorPrec[y] || 0; // Handle undefined precedence
//   }

//   // Apply operation
//   private evaluate(a: number, b: number, op: string): number {
//     switch (op) {
//       case "+":
//         return a + b;
//       case "-":
//         return a - b;
//       case "x":
//         return a * b;
//       case "/":
//         return a / b;
//       case "%":
//         return a % b;

//       default:
//         throw new Error(`Unsupported operator: ${op}`);
//     }
//   }

//   // Evaluate expression (using shunting-yard algorithm)
//   public calculate(exp: string): number {
//     const operationStack: string[] = []; // Operator stack
//     const operandStack: number[] = []; // Operand stack

//     for (const char of exp.split(" ")) {
//       if (!isNaN(parseFloat(char))) {
//         // Push number to operand stack
//         operandStack.push(parseFloat(char));
//         // } else if (char === ")") {
//         //   // Pop and evaluate operators until opening parenthesis is found
//         //   while (
//         //     operationStack.length > 0 &&
//         //     operationStack[operationStack.length - 1] !== "("
//         //   ) {
//         //     this.evaluate2(operationStack, operandStack);
//         //   }
//         //   operationStack.pop(); // Pop the opening parenthesis
//       } else if (
//         operationStack.length === 0 ||
//         this.determineOperatorPrecedence(
//           char,
//           operationStack[operationStack.length - 1]
//         ) < 0
//       ) {
//         // Push operator to operator stack if lower precedence or empty stack
//         operationStack.push(char);
//       } else {
//         // Pop and evaluate operators with higher precedence than current operator
//         while (
//           operationStack.length > 0 &&
//           this.determineOperatorPrecedence(
//             char,
//             operationStack[operationStack.length - 1]
//           ) > 0
//         ) {
//           this.evaluate2(operationStack, operandStack);
//         }
//         operationStack.push(char);
//       }
//     }

//     // Evaluate remaining operators after processing all tokens
//     while (operationStack.length > 0) {
//       this.evaluate2(operationStack, operandStack);
//     }

//     // Return the final result from the operand stack
//     if (operandStack.length !== 1) {
//       throw new Error("Invalid expression"); // Handle invalid expressions
//     }

//     return operandStack[0];
//   }

//   // Helper function to perform operation and push result to operand stack
//   private evaluate2(operationStack: string[], operandStack: number[]): void {
//     const a = operandStack.pop()!;
//     const b = operandStack.pop()!;
//     const op = operationStack.pop()!;
//     operandStack.push(this.evaluate(b, a, op)); // Reversed for correct evaluation order
//   }
// }
// export default BodmasCalculator;
