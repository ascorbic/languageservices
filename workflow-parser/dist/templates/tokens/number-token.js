import { LiteralToken } from "./index.js";
import { TokenType } from "./types.js";
export class NumberToken extends LiteralToken {
    constructor(file, range, value, definitionInfo) {
        super(TokenType.Number, file, range, definitionInfo);
        this.num = value;
    }
    get value() {
        return this.num;
    }
    clone(omitSource) {
        return omitSource
            ? new NumberToken(undefined, undefined, this.num, this.definitionInfo)
            : new NumberToken(this.file, this.range, this.num, this.definitionInfo);
    }
    toString() {
        return `${this.num}`;
    }
    toJSON() {
        return this.num;
    }
}
//# sourceMappingURL=number-token.js.map