import {TemplateContext, TemplateValidationErrors} from "../templates/template-context";
import * as templateReader from "../templates/template-reader";
import {TemplateToken} from "../templates/tokens/template-token";
import {TraceWriter} from "../templates/trace-writer";
import {File} from "./file.js";
import {WORKFLOW_ROOT} from "./workflow-constants";
import {getWorkflowSchema} from "./workflow-schema";
import {YamlObjectReader} from "./yaml-object-reader";
export interface ParseWorkflowResult {
  context: TemplateContext;
  value: TemplateToken | undefined;
}

export function parseWorkflow(entryFile: File, trace: TraceWriter): ParseWorkflowResult;
export function parseWorkflow(entryFile: File, context: TemplateContext): ParseWorkflowResult;
export function parseWorkflow(entryFile: File, contextOrTrace: TraceWriter | TemplateContext): ParseWorkflowResult {
  const context =
    contextOrTrace instanceof TemplateContext
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

  return <ParseWorkflowResult>{
    context,
    value: result
  };
}
