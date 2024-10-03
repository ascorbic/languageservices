import {WorkflowContext} from "@actions/languageservice/context/workflow-context.js";
import {convertWorkflowTemplate, NoOperationTraceWriter, parseWorkflow} from "@actions/workflow-parser";
import {isJob} from "@actions/workflow-parser/model/type-guards.js";

export async function createWorkflowContext(
  workflow: string,
  job?: string,
  stepIndex?: number
): Promise<WorkflowContext> {
  const parsed = parseWorkflow({name: "test.yaml", content: workflow}, new NoOperationTraceWriter());
  if (!parsed.value) {
    throw new Error("Failed to parse workflow");
  }
  const template = await convertWorkflowTemplate(parsed.context, parsed.value);
  const context: WorkflowContext = {uri: "test.yaml", template};

  if (job) {
    const workflowJob = template.jobs.find(j => j.id.value === job);
    if (workflowJob) {
      if (isJob(workflowJob)) {
        context.job = workflowJob;
      } else {
        context.reusableWorkflowJob = workflowJob;
      }
    }
  }

  if (stepIndex !== undefined) {
    context.step = context.job?.steps[stepIndex];
  }

  return context;
}
