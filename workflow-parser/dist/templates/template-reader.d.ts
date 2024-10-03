import { ObjectReader } from "./object-reader.js";
import { TemplateContext } from "./template-context.js";
import { TemplateToken } from "./tokens/index.js";
export declare function readTemplate(context: TemplateContext, type: string, objectReader: ObjectReader, fileId: number | undefined): TemplateToken | undefined;
export interface ReadTemplateResult {
    value: TemplateToken;
    bytes: number;
}
//# sourceMappingURL=template-reader.d.ts.map