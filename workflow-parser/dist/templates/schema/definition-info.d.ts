import { TemplateSchema } from "./index.js";
import { Definition } from "./definition.js";
import { DefinitionType } from "./definition-type.js";
import { ScalarDefinition } from "./scalar-definition.js";
export declare class DefinitionInfo {
    private readonly _schema;
    readonly isDefinitionInfo = true;
    readonly definition: Definition;
    readonly allowedContext: string[];
    constructor(schema: TemplateSchema, name: string);
    constructor(parent: DefinitionInfo, name: string);
    constructor(parent: DefinitionInfo, definition: Definition);
    getScalarDefinitions(): ScalarDefinition[];
    getDefinitionsOfType(type: DefinitionType): Definition[];
}
//# sourceMappingURL=definition-info.d.ts.map