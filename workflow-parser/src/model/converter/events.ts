import {TemplateContext} from "../../templates/template-context.js";
import {MappingToken} from "../../templates/tokens/mapping-token.js";
import {SequenceToken} from "../../templates/tokens/sequence-token.js";
import {TemplateToken} from "../../templates/tokens/template-token.js";
import {isLiteral, isMapping, isSequence, isString} from "../../templates/tokens/type-guards.js";
import {TokenType} from "../../templates/tokens/types.js";
import {
  BranchFilterConfig,
  EventsConfig,
  PathFilterConfig,
  ScheduleConfig,
  TagFilterConfig,
  TypesFilterConfig,
  WorkflowFilterConfig
} from "../workflow-template.js";
import {isValidCron} from "./cron.js";
import {convertStringList} from "./string-list.js";
import {convertEventWorkflowCall} from "./workflow-call.js";
import {convertEventWorkflowDispatchInputs} from "./workflow-dispatch.js";

export function convertOn(context: TemplateContext, token: TemplateToken): EventsConfig {
  if (isLiteral(token)) {
    const event = token.assertString("on");

    return {
      [event.value]: {}
    } as EventsConfig;
  }

  if (isSequence(token)) {
    const result = {} as EventsConfig;

    for (const item of token) {
      const event = item.assertString("on");
      result[event.value] = {};
    }

    return result;
  }

  if (isMapping(token)) {
    const result = {} as EventsConfig;

    for (const item of token) {
      const eventKey = item.key.assertString("event name");
      const eventName = eventKey.value;

      if (item.value.templateTokenType === TokenType.Null) {
        result[eventName] = {};
        continue;
      }

      // Schedule is the only event that can be a sequence, handle that separately
      if (eventName === "schedule") {
        const scheduleToken = item.value.assertSequence(`event ${eventName}`);
        result.schedule = convertSchedule(context, scheduleToken);
        continue;
      }

      // All other events are defined as mappings. During schema validation we already ensure that events
      // receive only known keys, so here we can focus on the values and whether they are valid.

      const eventToken = item.value.assertMapping(`event ${eventName}`);
      if (eventName === "workflow_call") {
        result.workflow_call = convertEventWorkflowCall(context, eventToken);
        continue;
      }

      if (eventName === "workflow_dispatch") {
        result.workflow_dispatch = convertEventWorkflowDispatchInputs(context, eventToken);
        continue;
      }

      result[eventName] = {
        ...convertPatternFilter("branches", eventToken),
        ...convertPatternFilter("tags", eventToken),
        ...convertPatternFilter("paths", eventToken),
        ...convertFilter("types.js", eventToken),
        ...convertFilter("workflows", eventToken)
      };
    }

    return result;
  }

  context.error(token, "Invalid format for 'on'");
  return {};
}

type AnyConfig = BranchFilterConfig & TagFilterConfig & PathFilterConfig;

function convertPatternFilter<T extends AnyConfig = AnyConfig>(
  name: "branches" | "tags" | "paths",
  token: MappingToken
): AnyConfig {
  const result = {} as T;

  for (const item of token) {
    const key = item.key.assertString(`${name} filter key`);

    switch (key.value) {
      case name:
        if (isString(item.value)) {
          result[name] = [item.value.value];
        } else {
          result[name] = convertStringList(name, item.value.assertSequence(`${name} list`));
        }
        break;

      case `${name}-ignore`:
        if (isString(item.value)) {
          result[`${name}-ignore`] = [item.value.value];
        } else {
          result[`${name}-ignore`] = convertStringList(
            `${name}-ignore`,
            item.value.assertSequence(`${name}-ignore list`)
          );
        }
        break;
    }
  }

  return result;
}

function convertFilter<T extends TypesFilterConfig & WorkflowFilterConfig = TypesFilterConfig & WorkflowFilterConfig>(
  name: "types.js" | "workflows",
  token: MappingToken
): TypesFilterConfig & WorkflowFilterConfig {
  const result = {} as T;

  for (const item of token) {
    const key = item.key.assertString(`${name} filter key`);

    switch (key.value) {
      case name:
        if (isString(item.value)) {
          result[name] = [item.value.value];
        } else {
          result[name] = convertStringList(name, item.value.assertSequence(`${name} list`));
        }
        break;
    }
  }

  return result;
}

function convertSchedule(context: TemplateContext, token: SequenceToken): ScheduleConfig[] | undefined {
  const result = [] as ScheduleConfig[];
  for (const item of token) {
    const mappingToken = item.assertMapping(`event schedule`);
    if (mappingToken.count == 1) {
      const schedule = mappingToken.get(0);
      const scheduleKey = schedule.key.assertString(`schedule key`);
      if (scheduleKey.value == "cron") {
        const cron = schedule.value.assertString(`schedule cron`);
        // Validate the cron string
        if (!isValidCron(cron.value)) {
          context.error(cron, "Invalid cron string");
        }
        result.push({cron: cron.value});
      } else {
        context.error(scheduleKey, `Invalid schedule key`);
      }
    } else {
      context.error(mappingToken, "Invalid format for 'schedule'");
    }
  }

  return result;
}
