import {DEFINITION, BOOLEAN} from "../template-constants.js";
import {MappingToken, LiteralToken} from "../tokens/index.js";
import {TokenType} from "../tokens/types.js";
import {DefinitionType} from "./definition-type.js";
import {ScalarDefinition} from "./scalar-definition.js";

export class BooleanDefinition extends ScalarDefinition {
  public constructor(key: string, definition?: MappingToken) {
    super(key, definition);
    if (definition) {
      for (const definitionPair of definition) {
        const definitionKey = definitionPair.key.assertString(`${DEFINITION} key`);
        switch (definitionKey.value) {
          case BOOLEAN: {
            const mapping = definitionPair.value.assertMapping(`${DEFINITION} ${BOOLEAN}`);
            for (const mappingPair of mapping) {
              const mappingKey = mappingPair.key.assertString(`${DEFINITION} ${BOOLEAN} key`);
              switch (mappingKey.value) {
                default:
                  // throws
                  mappingKey.assertUnexpectedValue(`${DEFINITION} ${BOOLEAN} key`);
                  break;
              }
            }
            break;
          }
          default:
            definitionKey.assertUnexpectedValue(`${DEFINITION} key`); // throws
        }
      }
    }
  }

  public override get definitionType(): DefinitionType {
    return DefinitionType.Boolean;
  }

  public override isMatch(literal: LiteralToken): boolean {
    return literal.templateTokenType === TokenType.Boolean;
  }

  public override validate(): void {
    // no-op
  }
}
