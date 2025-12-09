import type { CustomsInput, CustomsResult } from "./types";
import { calculateCustomsValue } from "./value";

export function calculateCustomsTaxes(input: CustomsInput): CustomsResult {
  const customsValue = calculateCustomsValue(input);
  const duty = customsValue * input.dutyRate;
  const igvBase = customsValue + duty;
  const igv = igvBase * input.igvRate;
  const totalTaxes = duty + igv;

  return {
    customsValue,
    duty,
    igvBase,
    igv,
    totalTaxes,
  };
}
