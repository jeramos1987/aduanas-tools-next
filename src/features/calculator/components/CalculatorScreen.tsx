"use client";

import { useCalculator } from "../hooks/useCalculator";
import { CalculatorForm } from "./CalculatorForm";

export function CalculatorScreen() {
  const { result, isLoading, calculate } = useCalculator();

  return (
    <main className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold">Calculadora Aduanera</h1>

      <CalculatorForm onSubmit={calculate} />

      {isLoading && <p>Calculando…</p>}

      {result && (
        <pre className="border rounded p-3 text-sm">
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
