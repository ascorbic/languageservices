import {data, DescriptionDictionary} from "@actions/expressions";
import {StringData} from "@actions/expressions/data/string";
import {WorkflowContext} from "../context/workflow-context.js";
import {Mode} from "./default.js";
import {getDescription} from "./descriptions.js";

export function getSecretsContext(workflowContext: WorkflowContext, mode: Mode): DescriptionDictionary {
  const d = new DescriptionDictionary({
    key: "GITHUB_token.js",
    value: new data.StringData("***"),
    description: getDescription("secrets", "GITHUB_token.js")
  });

  const eventsConfig = workflowContext?.template?.events;
  if (eventsConfig?.workflow_call) {
    // Unpredictable secrets may be passed in via a workflow_call trigger
    d.complete = false;
    if (mode === Mode.Completion) {
      for (const [name, value] of Object.entries(eventsConfig.workflow_call.secrets || {})) {
        d.add(name, new StringData(""), value.description);
      }
    }
  }

  return d;
}
