import { LiteralToken, MappingToken } from "../tokens/index.js";
import { Definition } from "./definition.js";
export declare abstract class ScalarDefinition extends Definition {
    constructor(key: string, definition?: MappingToken);
    abstract isMatch(literal: LiteralToken): boolean;
}
//# sourceMappingURL=scalar-definition.d.ts.map