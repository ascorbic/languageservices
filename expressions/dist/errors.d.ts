import { Pos, Token } from "./lexer.js";
export declare const MAX_PARSER_DEPTH = 50;
export declare const MAX_EXPRESSION_LENGTH = 21000;
export declare enum ErrorType {
    ErrorUnexpectedSymbol = 0,
    ErrorUnrecognizedNamedValue = 1,
    ErrorUnexpectedEndOfExpression = 2,
    ErrorExceededMaxDepth = 3,
    ErrorExceededMaxLength = 4,
    ErrorTooFewParameters = 5,
    ErrorTooManyParameters = 6,
    ErrorUnrecognizedContext = 7,
    ErrorUnrecognizedFunction = 8
}
export declare class ExpressionError extends Error {
    private typ;
    private tok;
    constructor(typ: ErrorType, tok: Token);
    pos: Pos;
}
export declare class ExpressionEvaluationError extends Error {
}
//# sourceMappingURL=errors.d.ts.map