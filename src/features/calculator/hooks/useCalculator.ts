"use client";

import { useState } from "react";
import type { CalculatorFormValues, CalculatorResult } from "../types";
import { calculateCustomsTaxes } from "@/domain/customs/taxes";

export function useCalculator() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculate = (values: CalculatorFormValues) => {
    setIsLoading(true);
    try {
      const res = calculateCustomsTaxes(values);
      setResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, calculate };
}
