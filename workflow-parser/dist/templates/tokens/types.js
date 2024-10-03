export var TokenType;
(function (TokenType) {
    TokenType[TokenType["String"] = 0] = "String";
    TokenType[TokenType["Sequence"] = 1] = "Sequence";
    TokenType[TokenType["Mapping"] = 2] = "Mapping";
    TokenType[TokenType["BasicExpression"] = 3] = "BasicExpression";
    TokenType[TokenType["InsertExpression"] = 4] = "InsertExpression";
    TokenType[TokenType["Boolean"] = 5] = "Boolean";
    TokenType[TokenType["Number"] = 6] = "Number";
    TokenType[TokenType["Null"] = 7] = "Null";
})(TokenType = TokenType || (TokenType = {}));
export function tokenTypeName(type) {
    switch (type) {
        case TokenType.String:
            return "Stringtoken.js";
        case TokenType.Sequence:
            return "Sequencetoken.js";
        case TokenType.Mapping:
            return "Mappingtoken.js";
        case TokenType.BasicExpression:
            return "BasicExpressiontoken.js";
        case TokenType.InsertExpression:
            return "InsertExpressiontoken.js";
        case TokenType.Boolean:
            return "Booleantoken.js";
        case TokenType.Number:
            return "Numbertoken.js";
        case TokenType.Null:
            return "Nulltoken.js";
        default: {
            // Use never to ensure exhaustiveness
            const exhaustiveCheck = type;
            throw new Error(`Unhandled token type: ${type} ${exhaustiveCheck}}`);
        }
    }
}
//# sourceMappingURL=types.js.map