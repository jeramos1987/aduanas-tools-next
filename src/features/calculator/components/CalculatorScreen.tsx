/**
 * ============================================================================
 * PANTALLA PRINCIPAL DE LA CALCULADORA ADUANERA
 * ============================================================================
 * Este es el componente principal que orquesta toda la funcionalidad
 * de la calculadora. Integra el formulario y la lógica de cálculo.
 */

"use client";

import { useCalculator } from "../hooks/useCalculator";
import { CalculatorForm } from "./CalculatorForm";

/**
 * CalculatorScreen - Componente principal de la calculadora
 * 
 * ARQUITECTURA:
 * - Usa el hook useCalculator para manejar el estado y la lógica de cálculo
 * - Renderiza el formulario (CalculatorForm) y le pasa la función de cálculo
 * - Muestra los resultados cuando están disponibles
 * 
 * FLUJO DE DATOS:
 * 1. Usuario llena el formulario (CalculatorForm)
 * 2. Usuario hace clic en "Calcular tributos"
 * 3. Se ejecuta la función calculate() del hook
 * 4. El hook calcula los impuestos y actualiza el estado
 * 5. Los resultados se muestran en pantalla
 */
export function CalculatorScreen() {
  // ============================================================================
  // HOOK PERSONALIZADO
  // ============================================================================
  // useCalculator nos proporciona:
  // - result: Los resultados del cálculo (null si aún no se ha calculado)
  // - isLoading: Indica si está calculando (útil para mostrar un spinner)
  // - calculate: Función para ejecutar el cálculo con los datos del formulario
  const { result, isLoading, calculate } = useCalculator();

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <main className="max-w-xl mx-auto py-10 space-y-4">
      {/* ===== TÍTULO DE LA APLICACIÓN ===== */}
      <h1 className="text-2xl font-bold">Calculadora Aduanera</h1>

      {/* ===== FORMULARIO DE ENTRADA ===== */}
      {/* Pasamos la función calculate como callback onSubmit */}
      {/* Cuando el usuario envía el formulario, se ejecuta calculate() */}
      <CalculatorForm onSubmit={calculate} />

      {/* ===== INDICADOR DE CARGA ===== */}
      {/* Mostramos "Calculando…" mientras isLoading es true */}
      {/* En la práctica, el cálculo es tan rápido que esto casi nunca se ve */}
      {isLoading && <p>Calculando…</p>}

      {/* ===== RESULTADOS DEL CÁLCULO ===== */}
      {/* Solo mostramos los resultados si result no es null */}
      {/* result contiene: customsValue, duty, igvBase, igv, totalTaxes */}
      {result && (
        <pre className="border rounded p-3 text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
