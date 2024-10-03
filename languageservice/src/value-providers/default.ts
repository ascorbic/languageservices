import {ValueProviderConfig, ValueProviderKind} from "./config.js";
import {needs} from "./needs.js";
import {reusableJobInputs} from "./reusable-job-inputs.js";
import {reusableJobSecrets} from "./reusable-job-secrets.js";
import {stringsToValues} from "./strings-to-values";

export const DEFAULT_RUNNER_LABELS = [
  "ubuntu-latest",
  "ubuntu-22.04",
  "ubuntu-20.04",
  "ubuntu-18.04",
  "windows-latest",
  "windows-2022",
  "windows-2019",
  "macos-latest",
  "macos-12",
  "macos-11",
  "macos-10.15",
  "self-hosted"
];

export const defaultValueProviders: ValueProviderConfig = {
  needs: {
    kind: ValueProviderKind.AllowedValues,
    get: context => Promise.resolve(needs(context))
  },
  "workflow-job-with": {
    kind: ValueProviderKind.AllowedValues,
    get: context => Promise.resolve(reusableJobInputs(context))
  },
  "workflow-job-secrets": {
    kind: ValueProviderKind.SuggestedValues,
    get: (context, existingValues) => Promise.resolve(reusableJobSecrets(context, existingValues))
  },
  "runs-on": {
    kind: ValueProviderKind.SuggestedValues,
    get: () => Promise.resolve(stringsToValues(DEFAULT_RUNNER_LABELS))
  }
};
