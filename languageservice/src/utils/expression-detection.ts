import {isString} from "@actions/workflow-parser";
import {DefinitionType} from "@actions/workflow-parser/templates/schema/definition-type.js";
import {StringDefinition} from "@actions/workflow-parser/templates/schema/string-definition.js";
import {OPEN_EXPRESSION} from "@actions/workflow-parser/templates/template-constants.js";
import {TemplateToken} from "@actions/workflow-parser/templates/tokens/index.js";

export function isPotentiallyExpression(token: TemplateToken): boolean {
  const isAlwaysExpression =
    token.definition?.definitionType === DefinitionType.String && (token.definition as StringDefinition).isExpression;
  const containsExpression = isString(token) && token.value != null && token.value.indexOf(OPEN_EXPRESSION) >= 0;
  return isAlwaysExpression || containsExpression;
}
