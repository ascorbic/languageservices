import { ObjectReader } from "./object-reader.js";
import { LiteralToken, SequenceToken, MappingToken } from "./tokens/index.js";
export declare class JSONObjectReader implements ObjectReader {
    private readonly _fileId;
    private readonly _generator;
    private _current;
    constructor(fileId: number | undefined, input: string);
    allowLiteral(): LiteralToken | undefined;
    allowSequenceStart(): SequenceToken | undefined;
    allowSequenceEnd(): boolean;
    allowMappingStart(): MappingToken | undefined;
    allowMappingEnd(): boolean;
    validateEnd(): void;
    validateStart(): void;
    /**
     * Returns all tokens (depth first)
     */
    private getParseEvents;
}
//# sourceMappingURL=json-object-reader.d.ts.map