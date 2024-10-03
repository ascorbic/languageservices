import { ObjectReader } from "../object-reader.js";
import { MappingToken } from "../tokens/index.js";
import { Definition } from "./definition.js";
import { DefinitionType } from "./definition-type.js";
import { MappingDefinition } from "./mapping-definition.js";
import { PropertyDefinition } from "./property-definition.js";
import { ScalarDefinition } from "./scalar-definition.js";
/**
 * This models the root schema object and contains definitions
 */
export declare class TemplateSchema {
    private static readonly _definitionNamePattern;
    private static _internalSchema;
    readonly definitions: {
        [key: string]: Definition;
    };
    readonly version: string;
    constructor(mapping?: MappingToken);
    /**
     * Looks up a definition by name
     */
    getDefinition(name: string): Definition;
    /**
     * Expands one-of definitions and returns all scalar definitions
     */
    getScalarDefinitions(definition: Definition): ScalarDefinition[];
    /**
     * Expands one-of definitions and returns all matching definitions by type
     */
    getDefinitionsOfType(definition: Definition, type: DefinitionType): Definition[];
    /**
     * Attempts match the property name to a property defined by any of the specified definitions.
     * If matched, any unmatching definitions are filtered from the definitions array.
     * Returns the type information for the matched property.
     */
    matchPropertyAndFilter(definitions: MappingDefinition[], propertyName: string): PropertyDefinition | undefined;
    private validate;
    /**
     * Loads a user-defined schema file
     */
    static load(objectReader: ObjectReader): TemplateSchema;
    /**
     * Gets the internal schema used for reading user-defined schema files
     */
    private static getInternalSchema;
}
//# sourceMappingURL=template-schema.d.ts.map