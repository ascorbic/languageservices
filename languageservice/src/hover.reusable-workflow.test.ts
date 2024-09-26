import {hover} from "./hover.js";
import {testHoverConfig} from "./hover.test";
import {getPositionFromCursor} from "./test-utils/cursor-position";
import {clearCache} from "./utils/workflow-cache";

beforeEach(() => {
  clearCache();
});

describe("hover.reusable-workflow", () => {
  it("hover on job input with description", async () => {
    const input = `
on: push

jobs:
  build:
    uses: ./reusable-workflow-with-inputs.yaml
    with:
      us|ername:
`;
    const result = await hover(...getPositionFromCursor(input), testHoverConfig("username", "scalar-needs-context"));
    expect(result).not.toBeUndefined();
    expect(result?.contents).toEqual(
      "A username passed from the caller workflow\n\nAvailable expression contexts: `github`, `inputs`, `vars`, `needs`, `strategy`, `matrix`"
    );
  });

  it("hover on job input without description", async () => {
    const input = `
on: push

jobs:
  build:
    uses: ./reusable-workflow-with-inputs-no-description.yaml
    with:
      us|ername:
`;
    const result = await hover(...getPositionFromCursor(input));
    expect(result).not.toBeUndefined();
    expect(result?.contents).toEqual(
      "Available expression contexts: `github`, `inputs`, `vars`, `needs`, `strategy`, `matrix`"
    );
  });

  it("hover on job output with description", async () => {
    const input = `
on: push

jobs:
  build:
    uses: ./reusable-workflow-with-outputs.yaml
  echo_outputs:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - run: echo \${{ needs.build.outputs.bu|ild_id }}
`;

    const result = await hover(...getPositionFromCursor(input), testHoverConfig("", "string-steps-context"));
    expect(result).not.toBeUndefined();
    expect(result?.contents).toEqual("The resulting build ID");
  });
});
