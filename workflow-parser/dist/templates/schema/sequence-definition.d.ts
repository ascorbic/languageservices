import { MappingToken } from "../tokens/index.js";
import { Definition } from "./definition.js";
import { DefinitionType } from "./definition-type.js";
import { TemplateSchema } from "./template-schema.js";
export declare class SequenceDefinition extends Definition {
    itemType: string;
    constructor(key: string, definition?: MappingToken);
    get definitionType(): DefinitionType;
    validate(schema: TemplateSchema, name: string): void;
}
//# sourceMappingURL=sequence-definition.d.ts.map