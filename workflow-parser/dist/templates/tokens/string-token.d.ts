import { LiteralToken, TemplateToken } from "./index.js";
import { DefinitionInfo } from "../schema/definition-info.js";
import { TokenRange } from "./token-range.js";
export declare class StringToken extends LiteralToken {
    readonly value: string;
    readonly source: string | undefined;
    constructor(file: number | undefined, range: TokenRange | undefined, value: string, definitionInfo: DefinitionInfo | undefined, source?: string);
    clone(omitSource?: boolean): TemplateToken;
    toString(): string;
    toJSON(): string;
}
//# sourceMappingURL=string-token.d.ts.map