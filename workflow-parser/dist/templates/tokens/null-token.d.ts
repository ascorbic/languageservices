import { LiteralToken, TemplateToken } from "./index.js";
import { DefinitionInfo } from "../schema/definition-info.js";
import { TokenRange } from "./token-range.js";
export declare class NullToken extends LiteralToken {
    constructor(file: number | undefined, range: TokenRange | undefined, definitionInfo: DefinitionInfo | undefined);
    clone(omitSource?: boolean): TemplateToken;
    toString(): string;
    toJSON(): any;
}
//# sourceMappingURL=null-token.d.ts.map