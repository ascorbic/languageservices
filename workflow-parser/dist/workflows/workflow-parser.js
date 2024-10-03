import { TemplateContext, TemplateValidationErrors } from "../templates/template-context.js";
import * as templateReader from "../templates/template-reader.js";
import { WORKFLOW_ROOT } from "./workflow-constants.js";
import { getWorkflowSchema } from "./workflow-schema.js";
import { YamlObjectReader } from "./yaml-object-reader.js";
export function parseWorkflow(entryFile, contextOrTrace) {
    const context = contextOrTrace instanceof TemplateContext
        ? contextOrTrace
        : new TemplateContext(new TemplateValidationErrors(), getWorkflowSchema(), contextOrTrace);
    const fileId = context.getFileId(entryFile.name);
    const reader = new YamlObjectReader(fileId, entryFile.content);
    if (reader.errors.length > 0) {
        // The file is not valid YAML, template errors could be misleading
        for (const err of reader.errors) {
            context.error(fileId, err.message, err.range);
        }
        return {
            context,
            value: undefined
        };
    }
    const result = templateReader.readTemplate(context, WORKFLOW_ROOT, reader, fileId);
    return {
        context,
        value: result
    };
}
//# sourceMappingURL=workflow-parser.js.map