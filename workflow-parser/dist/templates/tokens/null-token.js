import { LiteralToken } from "./index.js";
import { TokenType } from "./types.js";
export class NullToken extends LiteralToken {
    constructor(file, range, definitionInfo) {
        super(TokenType.Null, file, range, definitionInfo);
    }
    clone(omitSource) {
        return omitSource
            ? new NullToken(undefined, undefined, this.definitionInfo)
            : new NullToken(this.file, this.range, this.definitionInfo);
    }
    toString() {
        return "";
    }
    toJSON() {
        return null;
    }
}
//# sourceMappingURL=null-token.js.map