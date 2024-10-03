import { ObjectReader } from "../templates/object-reader.js";
import { LiteralToken, MappingToken, SequenceToken } from "../templates/tokens/index.js";
import { TokenRange } from "../templates/tokens/token-range.js";
export type YamlError = {
    message: string;
    range: TokenRange | undefined;
};
export declare class YamlObjectReader implements ObjectReader {
    private readonly _generator;
    private _current;
    private fileId?;
    private lineCounter;
    errors: YamlError[];
    constructor(fileId: number | undefined, content: string);
    private getNodes;
    private getRange;
    private static getLiteralToken;
    allowLiteral(): LiteralToken | undefined;
    allowSequenceStart(): SequenceToken | undefined;
    allowSequenceEnd(): boolean;
    allowMappingStart(): MappingToken | undefined;
    allowMappingEnd(): boolean;
    validateEnd(): void;
    validateStart(): void;
}
//# sourceMappingURL=yaml-object-reader.d.ts.map