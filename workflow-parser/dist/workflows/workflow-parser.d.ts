import { TemplateContext } from "../templates/template-context.js";
import { TemplateToken } from "../templates/tokens/template-token.js";
import { TraceWriter } from "../templates/trace-writer.js";
import { File } from "./file.js";
export interface ParseWorkflowResult {
    context: TemplateContext;
    value: TemplateToken | undefined;
}
export declare function parseWorkflow(entryFile: File, trace: TraceWriter): ParseWorkflowResult;
export declare function parseWorkflow(entryFile: File, context: TemplateContext): ParseWorkflowResult;
//# sourceMappingURL=workflow-parser.d.ts.map