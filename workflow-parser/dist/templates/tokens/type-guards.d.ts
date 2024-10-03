import { BasicExpressionToken } from "./basic-expression-token.js";
import { BooleanToken } from "./boolean-token.js";
import { LiteralToken } from "./literal-token.js";
import { MappingToken } from "./mapping-token.js";
import { NumberToken } from "./number-token.js";
import { ScalarToken } from "./scalar-token.js";
import { SequenceToken } from "./sequence-token.js";
import { StringToken } from "./string-token.js";
import { TemplateToken } from "./template-token.js";
export declare function isLiteral(t: TemplateToken): t is LiteralToken;
export declare function isScalar(t: TemplateToken): t is ScalarToken;
export declare function isString(t: TemplateToken): t is StringToken;
export declare function isNumber(t: TemplateToken): t is NumberToken;
export declare function isBoolean(t: TemplateToken): t is BooleanToken;
export declare function isBasicExpression(t: TemplateToken): t is BasicExpressionToken;
export declare function isSequence(t: TemplateToken): t is SequenceToken;
export declare function isMapping(t: TemplateToken): t is MappingToken;
//# sourceMappingURL=type-guards.d.ts.map