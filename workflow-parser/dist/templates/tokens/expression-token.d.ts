import { DefinitionInfo } from "../schema/definition-info.js";
import { ScalarToken } from "./scalar-token.js";
import { TokenRange } from "./token-range.js";
export declare abstract class ExpressionToken extends ScalarToken {
    readonly directive: string | undefined;
    constructor(type: number, file: number | undefined, range: TokenRange | undefined, directive: string | undefined, definitionInfo: DefinitionInfo | undefined);
    get isLiteral(): boolean;
    get isExpression(): boolean;
    static validateExpression(expression: string, allowedContext: string[]): void;
}
//# sourceMappingURL=expression-token.d.ts.map