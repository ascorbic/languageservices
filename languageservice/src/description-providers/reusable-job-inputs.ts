import {isMapping, isString} from "@actions/workflow-parser";
import {DESCRIPTION} from "@actions/workflow-parser/templates/template-constants.js";
import {WorkflowContext} from "../context/workflow-context.js";
import {TokenResult} from "../utils/find-token.js";

export function isReusableWorkflowJobInput(tokenResult: TokenResult): boolean {
  return (
    tokenResult.parent?.definition?.key === "workflow-job-with" &&
    tokenResult.token !== null &&
    isString(tokenResult.token)
  );
}

export function getReusableWorkflowInputDescription(
  workflowContext: WorkflowContext,
  tokenResult: TokenResult
): string {
  const reusableWorkflowJob = workflowContext.reusableWorkflowJob;

  if (!reusableWorkflowJob) {
    return "";
  }

  const inputName = tokenResult.token && isString(tokenResult.token) && tokenResult.token.value;
  if (!inputName) {
    return "";
  }

  // Find the input description in the template, if any
  if (reusableWorkflowJob["input-definitions"]) {
    const definition = reusableWorkflowJob["input-definitions"].find(inputName);
    if (definition && isMapping(definition)) {
      const description = definition.find(DESCRIPTION);
      if (description && isString(description)) {
        return description.value;
      }
    }
  }

  return "";
}
