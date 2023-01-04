import {data} from "@github/actions-expressions";
import {isScalar, isString} from "@github/actions-workflow-parser";
import {WorkflowContext} from "../context/workflow-context";
import {MappingToken} from "@github/actions-workflow-parser/templates/tokens/mapping-token";

export function getEnvContext(workflowContext: WorkflowContext): data.Dictionary {
  const d = new data.Dictionary();

  //step env
  if (workflowContext.step?.env) {
    envContext(workflowContext.step.env, d);
  }

  //job env
  if (workflowContext.job && workflowContext.job.env) {
    envContext(workflowContext.job.env, d);
  }

  //workflow env
  if (workflowContext.template && workflowContext.template.env) {
    const wfEnv = workflowContext.template.env.assertMapping("workflow env");
    envContext(wfEnv, d);
  }

  return d;
}

function envContext(envMap: MappingToken, d: data.Dictionary) {
  for (const env of envMap) {
    if (!isString(env.key)) {
      continue;
    }

    const value = isScalar(env.value) ? new data.StringData(env.value.toDisplayString()) : new data.Null();
    d.add(env.key.value, value);
  }
}
