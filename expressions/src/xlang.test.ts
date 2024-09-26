import * as fs from "fs";
import * as path from "path";
import {Expr} from "./ast.js";
import * as data from "./data/index.js";
import {kindStr} from "./data/expressiondata.js";
import {replacer} from "./data/replacer.js";
import {reviver} from "./data/reviver.js";
import {ExpressionError} from "./errors.js";
import {Evaluator} from "./evaluator.js";
import {Lexer, Result} from "./lexer.js";
import {Parser} from "./parser.js";

interface TestResult {
  value: data.ExpressionData;
  kind: string;
}

enum TestErrorKind {
  Lexing = "lexing",
  Parsing = "parsing",
  Evaluation = "evaluation"
}

enum SkipOptionKind {
  Typescript = "typescript"
}

interface TestOptions {
  skip: SkipOptionKind[];
}

interface TestError {
  value: string;
  kind: TestErrorKind;
}

interface TestCase {
  expr: string;
  result: TestResult;
  err: TestError | undefined;
  contexts: data.Dictionary;
  options: TestOptions;
}

function testCaseReviver(key: string, val: unknown): unknown {
  if (key === "contexts") {
    const tmp = JSON.stringify(val);
    return JSON.parse(tmp, reviver);
  }

  if (key === "result") {
    const t = val as TestResult;
    t.value = reviver("value", t.value);
  }

  return val;
}

const testFiles = "./testdata";

describe("x-lang tests", () => {
  const files = fs.readdirSync(testFiles);

  for (const file of files) {
    const fileName = path.join(testFiles, file);

    const fileStat = fs.statSync(fileName);
    if (fileStat.isDirectory()) {
      throw new Error("sub-directories are not supported");
    }

    if (path.extname(fileName) !== ".json") {
      throw new Error("only json files are supported " + file);
    }

    const testFile = fs.readFileSync(fileName, "utf8");

    const testCases = JSON.parse(testFile, testCaseReviver) as {
      [name: string]: TestCase[];
    };

    for (const testCaseName of Object.keys(testCases)) {
      let tests = testCases[testCaseName];

      // Filter out tests that are not supported by typescript
      tests = tests.filter(t => !t.options?.skip?.includes(SkipOptionKind.Typescript));

      const testName = path.basename(file, ".json");

      if (tests.length === 0) {
        continue;
      }

      describe(testName, () => {
        test.each(tests)(`${testName}: ${testCaseName} ($expr)`, testCase => {
          if (!testCase.contexts) {
            testCase.contexts = new data.Dictionary();
          }

          const lexer = new Lexer(testCase.expr);
          let result: Result;
          try {
            result = lexer.lex();

            if (testCase.err && testCase.err.kind === TestErrorKind.Lexing) {
              throw new Error("expected error lexing expression, but got none");
            }
          } catch (e) {
            const err = e as Error;
            // Did test expect lexing error? If so, compare error message.
            if (testCase.err && testCase.err.kind === TestErrorKind.Lexing) {
              expect(err.message).toContain(testCase.err.value);
              return;
            }

            throw new Error(`unexpected error lexing expression: ${err.message} ${err.stack || ""}`);
          }

          // Parse
          const contextNames = testCase.contexts.pairs().map(x => x.key);
          const parser = new Parser(result.tokens, contextNames, []);
          let expr: Expr;
          try {
            expr = parser.parse();

            if (testCase.err?.kind === TestErrorKind.Parsing) {
              throw new Error("expected error parsing expression, but got none");
            }
          } catch (e) {
            // Did test expect parsing error?
            if (testCase.err?.kind === TestErrorKind.Parsing) {
              // Test expects parsing error
              const pe = e as ExpressionError;
              expect(errorWithExpression(pe, testCase.expr)).toContain(testCase.err.value);
              return;
            }
            const err = e as Error;
            throw new Error(`unexpected error parsing expression: ${err.message} ${err.stack || ""}`);
          }

          // Evaluate expression
          try {
            let result: data.ExpressionData;
            if (expr !== undefined) {
              const evaluator = new Evaluator(expr, testCase.contexts);
              result = evaluator.evaluate();
            } else {
              result = new data.Null();
            }

            if (testCase.err?.kind === TestErrorKind.Evaluation) {
              throw new Error("expected error evaluating expression, but got none");
            }

            expect(kindStr(result.kind)).toBe(testCase.result.kind);

            expect(JSON.stringify(result, replacer)).toEqual(JSON.stringify(testCase.result.value, replacer));
          } catch (e) {
            if (testCase.err?.kind === TestErrorKind.Evaluation) {
              const pe = e as ExpressionError;
              expect(errorWithExpression(pe, testCase.expr)).toContain(testCase.err.value);
              return;
            }

            const err = e as Error;
            throw new Error(`unexpected error evaluating expression:  ${err.message} ${err.stack || ""}`);
          }
        });
      });
    }
  }
});

function errorWithExpression(e: ExpressionError, expr: string): string {
  if (e.pos !== undefined) {
    return `${e.message}. Located at position ${e.pos.column + 1} within expression: ${expr}`;
  }

  return `${e.message}. Located within expression: ${expr}`;
}
