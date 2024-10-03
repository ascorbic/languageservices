import { TemplateToken } from "./index.js";
import { DefinitionInfo } from "../schema/definition-info.js";
import { SerializedSequenceToken } from "./serialization.js";
import { TokenRange } from "./token-range.js";
export declare class SequenceToken extends TemplateToken {
    private readonly seq;
    constructor(file: number | undefined, range: TokenRange | undefined, definitionInfo: DefinitionInfo | undefined);
    get count(): number;
    get isScalar(): boolean;
    get isLiteral(): boolean;
    get isExpression(): boolean;
    add(value: TemplateToken): void;
    get(index: number): TemplateToken;
    clone(omitSource?: boolean): TemplateToken;
    toJSON(): SerializedSequenceToken;
    [Symbol.iterator](): Iterator<TemplateToken>;
}
//# sourceMappingURL=sequence-token.d.ts.map