import { TemplateSchema } from "./template-schema.js";
import { MappingToken } from "../tokens/index.js";
import { Definition } from "./definition.js";
import { DefinitionType } from "./definition-type.js";
/**
 * Must resolve to exactly one of the referenced definitions
 */
export declare class OneOfDefinition extends Definition {
    readonly oneOf: string[];
    readonly oneOfPrefix: string[];
    constructor(key: string, definition?: MappingToken);
    get definitionType(): DefinitionType;
    validate(schema: TemplateSchema, name: string): void;
}
//# sourceMappingURL=one-of-definition.d.ts.map