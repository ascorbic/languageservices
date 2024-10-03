import { TemplateContext } from "../../../templates/template-context.js";
import { MappingToken, TemplateToken } from "../../../templates/tokens/index.js";
import { ReusableWorkflowJob } from "../../workflow-template.js";
type TokenMap = Map<string, [key: string, value: TemplateToken]>;
export declare function convertWorkflowJobInputs(context: TemplateContext, job: ReusableWorkflowJob): void;
export declare function createTokenMap(mapping: MappingToken | undefined, description: string): TokenMap | undefined;
export {};
//# sourceMappingURL=inputs.d.ts.map