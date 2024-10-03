import { TemplateContext } from "../../templates/template-context.js";
import { MappingToken } from "../../templates/tokens/mapping-token.js";
import { InputConfig, WorkflowDispatchConfig } from "../workflow-template.js";
export declare function convertEventWorkflowDispatchInputs(context: TemplateContext, token: MappingToken): WorkflowDispatchConfig;
export declare function convertWorkflowDispatchInputs(context: TemplateContext, token: MappingToken): {
    [inputName: string]: InputConfig;
};
export declare function convertWorkflowDispatchInput(context: TemplateContext, token: MappingToken): InputConfig;
//# sourceMappingURL=workflow-dispatch.d.ts.map