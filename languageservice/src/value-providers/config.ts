import {WorkflowContext} from "../context/workflow-context.js";

export interface Value {
  /** Label of this value */
  label: string;

  /** Optional description to show when auto-completing */
  description?: string;

  /** Whether this value is deprecated */
  deprecated?: boolean;

  /** Alternative insert text, if not given `label` will be used */
  insertText?: string;
}

export enum ValueProviderKind {
  AllowedValues,
  SuggestedValues
}

export type ValueProvider = {
  kind: ValueProviderKind;
  caseInsensitive?: boolean;
  get: (context: WorkflowContext, existingValues?: Set<string>) => Promise<Value[]>;
};

export interface ValueProviderConfig {
  [definitionKey: string]: ValueProvider;
}
