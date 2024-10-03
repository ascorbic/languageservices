import { TemplateToken, ExpressionToken } from "./index.js";
import { DefinitionInfo } from "../schema/definition-info.js";
import { SerializedExpressionToken } from "./serialization.js";
import { TokenRange } from "./token-range.js";
export declare class InsertExpressionToken extends ExpressionToken {
    constructor(file: number | undefined, range: TokenRange | undefined, definitionInfo: DefinitionInfo | undefined);
    clone(omitSource?: boolean): TemplateToken;
    toString(): string;
    toDisplayString(): string;
    toJSON(): SerializedExpressionToken;
}
//# sourceMappingURL=insert-expression-token.d.ts.map