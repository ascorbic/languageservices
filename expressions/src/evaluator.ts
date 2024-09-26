import {
  Binary,
  ContextAccess,
  Expr,
  ExprVisitor,
  FunctionCall,
  Grouping,
  IndexAccess,
  Literal,
  Logical,
  Star,
  Unary
} from "./ast.js";
import * as data from "./data/index.js";
import {FilteredArray} from "./filtered_array.js";
import {wellKnownFunctions} from "./funcs.js";
import {FunctionDefinition} from "./funcs/info.js";
import {idxHelper} from "./idxHelper.js";
import {TokenType} from "./lexer.js";
import {equals, falsy, greaterThan, lessThan, truthy} from "./result.js";

export class Evaluator implements ExprVisitor<data.ExpressionData> {
  /**
   * Creates a new evaluator
   * @param n Parsed expression to evaluate
   * @param context Context data to use
   * @param functions Optional map of function implementations. If given, these will be preferred over the built-in functions.
   */
  constructor(private n: Expr, private context: data.Dictionary, private functions?: Map<string, FunctionDefinition>) {}

  public evaluate(): data.ExpressionData {
    return this.eval(this.n);
  }

  protected eval(n: Expr): data.ExpressionData {
    return n.accept(this);
  }

  visitLiteral(literal: Literal): data.ExpressionData {
    return literal.literal;
  }

  visitUnary(unary: Unary): data.ExpressionData {
    const r = this.eval(unary.expr);

    if (unary.operator.type === TokenType.BANG) {
      return new data.BooleanData(falsy(r));
    }

    throw new Error(`unknown unary operator: ${unary.operator.lexeme}`);
  }

  visitBinary(binary: Binary): data.ExpressionData {
    const left = this.eval(binary.left);
    const right = this.eval(binary.right);

    switch (binary.operator.type) {
      case TokenType.EQUAL_EQUAL:
        return new data.BooleanData(equals(left, right));

      case TokenType.BANG_EQUAL:
        return new data.BooleanData(!equals(left, right));

      case TokenType.GREATER:
        return new data.BooleanData(greaterThan(left, right));

      case TokenType.GREATER_EQUAL:
        return new data.BooleanData(equals(left, right) || greaterThan(left, right));

      case TokenType.LESS:
        return new data.BooleanData(lessThan(left, right));

      case TokenType.LESS_EQUAL:
        return new data.BooleanData(equals(left, right) || lessThan(left, right));
    }

    throw new Error(`unknown binary operator: ${binary.operator.lexeme}`);
  }

  visitLogical(logical: Logical): data.ExpressionData {
    let result: data.ExpressionData;

    for (const arg of logical.args) {
      result = this.eval(arg);

      // Break?
      if (
        (logical.operator.type === TokenType.AND && falsy(result)) ||
        (logical.operator.type === TokenType.OR && truthy(result))
      ) {
        break;
      }
    }

    // result is always assigned before we return here
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result!;
  }

  visitGrouping(grouping: Grouping): data.ExpressionData {
    return this.eval(grouping.group);
  }

  visitContextAccess(contextAccess: ContextAccess): data.ExpressionData {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const r = this.context.get(contextAccess.name.lexeme)!;
    return r;
  }

  visitIndexAccess(ia: IndexAccess): data.ExpressionData {
    let idx: idxHelper;
    if (ia.index instanceof Star) {
      idx = new idxHelper(true, undefined);
    } else {
      let idxResult: data.ExpressionData;
      try {
        idxResult = this.eval(ia.index);
      } catch (e) {
        throw new Error(`could not evaluate index for index access: ${(e as Error).message}`, {cause: e});
      }
      idx = new idxHelper(false, idxResult);
    }

    const objResult = this.eval(ia.expr);

    let result: data.ExpressionData;
    switch (objResult.kind) {
      case data.Kind.Array: {
        const tobjResult = objResult;
        if (tobjResult instanceof FilteredArray) {
          result = filteredArrayAccess(tobjResult, idx);
        } else {
          result = arrayAccess(tobjResult, idx);
        }

        break;
      }

      case data.Kind.Dictionary: {
        const tobjResult = objResult;
        result = objectAccess(tobjResult, idx);
        break;
      }

      default:
        if (idx.star) {
          result = new FilteredArray();
        } else {
          result = new data.Null();
        }
    }

    return result;
  }

  visitFunctionCall(functionCall: FunctionCall): data.ExpressionData {
    // Evaluate arguments
    const args = functionCall.args.map(arg => this.eval(arg));

    // Get function definitions
    const functionName = functionCall.functionName.lexeme.toLowerCase();
    const f = this.functions?.get(functionName) || wellKnownFunctions[functionName];

    return f.call(...args);
  }
}

function filteredArrayAccess(fa: FilteredArray, idx: idxHelper): data.ExpressionData {
  const result = new FilteredArray();

  for (const item of fa.values()) {
    // Check the type of the nested item
    switch (item.kind) {
      case data.Kind.Dictionary: {
        const ti = item;
        if (idx.star) {
          for (const v of ti.values()) {
            result.add(v);
          }
        } else if (idx.str !== undefined) {
          const v = ti.get(idx.str);
          if (v !== undefined) {
            result.add(v);
          }
        }

        break;
      }

      case data.Kind.Array: {
        const ti = item;
        if (idx.star) {
          for (const v of ti.values()) {
            result.add(v);
          }
        } else if (idx.int !== undefined && idx.int < ti.values().length) {
          result.add(ti.get(idx.int));
        }

        break;
      }
    }
  }

  return result;
}

function arrayAccess(a: data.Array, idx: idxHelper): data.ExpressionData {
  if (idx.star) {
    const fa = new FilteredArray();
    for (const item of a.values()) {
      fa.add(item);
    }

    return fa;
  }

  if (idx.int !== undefined && idx.int < a.values().length) {
    return a.get(idx.int);
  }

  return new data.Null();
}

function objectAccess(obj: data.Dictionary, idx: idxHelper): data.ExpressionData {
  if (idx.star) {
    const fa = new FilteredArray(...obj.values());
    return fa;
  }

  if (idx.str !== undefined) {
    const r = obj.get(idx.str);
    if (r !== undefined) {
      return r;
    }
  }

  return new data.Null();
}
