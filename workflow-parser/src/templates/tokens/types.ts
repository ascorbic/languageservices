export enum TokenType {
  String = 0,
  Sequence,
  Mapping,
  BasicExpression,
  InsertExpression,
  Boolean,
  Number,
  Null
}

export function tokenTypeName(type: TokenType): string {
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
      const exhaustiveCheck: never = type;
      throw new Error(`Unhandled token type: ${type} ${exhaustiveCheck}}`);
    }
  }
}
