import {isValidCron, getCronDescription} from "./cron.js";

describe("cron", () => {
  describe("valid cron", () => {
    const valid = [
      ["0 0 * * *", "every day at midnight"],
      ["0 000 001 * *", "accepts leading zeros"],
      ["15 * * * *", "accepts numbers in range"],
      ["2,10 4,5 * * *", "accepts comma separated values"],
      ["30 4-6 * * *", "accepts range"],
      ["0 4-4 * * *", "accepts range with two equal values"],
      ["20/15 * * * *", "accepts step with numerical values"],
      ["30 5,17 * * *", "accepts numbers and ranges"],
      ["28 */4 * * *", "accepts step with * and numerical value"],
      ["28 5,*/4 * * *", "accepts comma separated value with step"],
      ["28 5,*/4,6-8 * * *", "accepts comma separated value with step and range"],
      ["0 0 * * SUN", "accepts day of week short name"],
      ["0 0 * * SUN-TUE", "accepts day of week short name range"],
      ["0 0 * * SUN-2", "accepts day of week range combined with number"],
      ["0 2-4/5 * * *", "accepts range with step"],
      ["0   0  *  *               *", "accepts multiple spaces"]
    ];

    for (const [cron, reason] of valid) {
      it(`${cron} should be valid: ${reason}`, () => {
        expect(isValidCron(cron)).toBe(true);
      });
    }
  });

  describe("invalid cron", () => {
    const invalid = [
      ["0 0 * *", "too few parts"],
      ["0 0 * * * * *", "too many parts"],
      ["0 -1 * * *", "should not accept negative numbers"],
      ["0 1- * * *", "should not accept trailing -"],
      ["0 /1 * * *", "should not accept leading / (empty value)"],
      ["0 1/ * * *", "should not accept trailing / (empty value)"],
      ["0 ,1 * * *", "should not accept leading , (empty value)"],
      ["0 1, * * *", "should not accept trailing , (empty value)"],
      ["0 5--5 * * *", "should not accept multiple -"],
      ["0 *//5 * * *", "should not accept multiple /"],
      ["0 */* * * *", "step start and size may not both be *"],
      ["0 5/* * * *", "steps size may not be *"],
      ["0 *-4 5-* *-* *", "range may not contain *"],
      ["0 ,, * * *", "should not accept multiple ,"],
      [", , , , ,", "comma is not a valid part"],
      ["0 ** * * *", "should not accept multiple *"],
      ["0 0 * * BUN", "invalid short name"],
      ["0 0 * SUN JAN", "short name in incorrect position"],
      ["0 0 * * FRI-TUE", "should not accept short name range with start > end"],
      ["0 12-4 * * *", "should not accept nuerical range with start > end"],
      ["0 */0 * * *", "step size may not be 0"],
      ["0 2/4-5 * * *", "step size may not be a range"],
      ["0 2-4-6 * * *", "range may not contain multiple -"],
      ["0 2/4/6 * * *", "step may not contain multiple /"],
      ["0 * * */FEB */TUE", "step size may not be a short name"]
    ];

    for (const [cron, reason] of invalid) {
      it(`${cron} should be invalid: ${reason}`, () => {
        expect(isValidCron(cron)).toBe(false);
      });
    }
  });

  describe("getCronDescription", () => {
    it(`Produces a sentence for valid cron`, () => {
      expect(getCronDescription("0 * * * *")).toEqual(
        "Runs every hour\n\n" +
          "Actions schedules run at most every 5 minutes. [Learn more](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#onschedule)"
      );
    });

    it(`Returns nothing for invalid cron`, () => {
      expect(getCronDescription("* * * * * *")).toBeUndefined();
    });
  });
});
