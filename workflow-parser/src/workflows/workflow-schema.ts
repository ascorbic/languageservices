import {JSONObjectReader} from "../templates/json-object-reader.js";
import {TemplateSchema} from "../templates/schema/index.js";
import WorkflowSchema from "../workflow-v1.0.json" assert {type: "json"};

let schema: TemplateSchema;

export function getWorkflowSchema(): TemplateSchema {
  if (schema === undefined) {
    const json = JSON.stringify(WorkflowSchema);
    schema = TemplateSchema.load(new JSONObjectReader(undefined, json));
  }
  return schema;
}
