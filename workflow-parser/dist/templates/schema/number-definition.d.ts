import { MappingToken, LiteralToken } from "../tokens/index.js";
import { DefinitionType } from "./definition-type.js";
import { ScalarDefinition } from "./scalar-definition.js";
export declare class NumberDefinition extends ScalarDefinition {
    constructor(key: string, definition?: MappingToken);
    get definitionType(): DefinitionType;
    isMatch(literal: LiteralToken): boolean;
    validate(): void;
}
//# sourceMappingURL=number-definition.d.ts.map