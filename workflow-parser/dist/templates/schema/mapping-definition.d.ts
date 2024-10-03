import { TemplateSchema } from "./template-schema.js";
import { MappingToken } from "../tokens/index.js";
import { Definition } from "./definition.js";
import { DefinitionType } from "./definition-type.js";
import { PropertyDefinition } from "./property-definition.js";
export declare class MappingDefinition extends Definition {
    readonly properties: {
        [key: string]: PropertyDefinition;
    };
    looseKeyType: string;
    looseValueType: string;
    constructor(key: string, definition?: MappingToken);
    get definitionType(): DefinitionType;
    validate(schema: TemplateSchema, name: string): void;
}
//# sourceMappingURL=mapping-definition.d.ts.map