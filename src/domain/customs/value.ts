import type { CustomsInput } from "./types";

export function calculateCustomsValue(input: CustomsInput): number {
  const { fob, freight, insurance, otherCosts = 0 } = input;

  return fob + freight + insurance + otherCosts;
}
