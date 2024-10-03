import { Dictionary } from "./data/dictionary.js";
import { FunctionDefinition, FunctionInfo } from "./funcs/info.js";
import { Token } from "./lexer.js";
export type CompletionItem = {
    label: string;
    description?: string;
    function: boolean;
};
/**
 * Complete returns a list of completion items for the given expression.
 * The main functionality is auto-completing functions and context access:
 * We can only provide assistance if the input is in one of the following forms (with | denoting the cursor position):
 * - context.path.inp| or context.path['inp| -- auto-complete context access
 * - context.path.| or context.path['| -- auto-complete context access
 * - toJS| -- auto-complete function call or top-level
 * - | -- auto-complete function call or top-level context access
 *
 * @param input Input expression
 * @param context Context available for the expression
 * @param extensionFunctions List of functions available
 * @param functions Optional map of functions to use during evaluation
 * @returns Array of completion items
 */
export declare function complete(input: string, context: Dictionary, extensionFunctions: FunctionInfo[], functions?: Map<string, FunctionDefinition>): CompletionItem[];
export declare function trimTokenVector(tokenVector: Token[]): Token[];
//# sourceMappingURL=completion.d.ts.map