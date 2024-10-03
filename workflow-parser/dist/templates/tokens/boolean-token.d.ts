import { LiteralToken, TemplateToken } from "./index.js";
import { DefinitionInfo } from "../schema/definition-info.js";
import { TokenRange } from "./token-range.js";
export declare class BooleanToken extends LiteralToken {
    private readonly bool;
    constructor(file: number | undefined, range: TokenRange | undefined, value: boolean, definitionInfo: DefinitionInfo | undefined);
    get value(): boolean;
    clone(omitSource?: boolean): TemplateToken;
    toString(): string;
    toJSON(): boolean;
}
//# sourceMappingURL=boolean-token.d.ts.map