/**
 * ============================================================================
 * HOOK PERSONALIZADO PARA LA CALCULADORA ADUANERA
 * ============================================================================
 * Este hook encapsula toda la lógica de estado y cálculo de la calculadora.
 * Separa la lógica de negocio de la presentación (componentes visuales).
 */

"use client";

import { useState } from "react";
import type { CalculatorFormValues, CalculatorResult } from "../types";
import { calculateCustomsTaxes } from "@/domain/customs/taxes";

/**
 * useCalculator - Hook personalizado para manejar el estado de la calculadora
 * 
 * RESPONSABILIDADES:
 * - Mantener el estado de los resultados del cálculo
 * - Mantener el estado de carga (loading)
 * - Proporcionar una función para ejecutar el cálculo
 * 
 * VENTAJAS DE USAR UN HOOK:
 * - Reutilizable: Podemos usar esta lógica en múltiples componentes
 * - Testeable: Podemos probar la lógica independientemente de la UI
 * - Separación de responsabilidades: La lógica está separada de la presentación
 * 
 * @returns Objeto con el estado y funciones de la calculadora
 */
export function useCalculator() {
  // ============================================================================
  // ESTADO DEL HOOK
  // ============================================================================

  /**
   * result - Almacena los resultados del último cálculo
   * 
   * Puede ser:
   * - null: Cuando aún no se ha realizado ningún cálculo
   * - CalculatorResult: Objeto con todos los valores calculados
   *   (customsValue, duty, igvBase, igv, totalTaxes)
   */
  const [result, setResult] = useState<CalculatorResult | null>(null);

  /**
   * isLoading - Indica si se está ejecutando un cálculo
   * 
   * En esta implementación simple, el cálculo es síncrono y muy rápido,
   * por lo que isLoading casi siempre será false.
   * 
   * Sin embargo, está preparado para el futuro si necesitamos:
   * - Hacer cálculos asíncronos (ej. consultar una API)
   * - Mostrar un spinner o indicador de carga
   */
  const [isLoading, setIsLoading] = useState(false);

  // ============================================================================
  // FUNCIÓN DE CÁLCULO
  // ============================================================================

  /**
   * calculate - Ejecuta el cálculo de impuestos aduaneros
   * 
   * PROCESO:
   * 1. Activa el estado de carga (isLoading = true)
   * 2. Ejecuta el cálculo usando la función del dominio
   * 3. Guarda los resultados en el estado
   * 4. Desactiva el estado de carga (isLoading = false)
   * 
   * MANEJO DE ERRORES:
   * Usamos try-finally para asegurar que isLoading siempre se desactive,
   * incluso si hay un error en el cálculo.
   * 
   * @param values - Datos del formulario (FOB, flete, seguro, tasas, etc.)
   */
  const calculate = (values: CalculatorFormValues) => {
    // Activamos el indicador de carga
    setIsLoading(true);

    try {
      // Ejecutamos el cálculo usando la lógica del dominio
      // calculateCustomsTaxes hace todos los cálculos:
      // 1. Valor en Aduana
      // 2. Derechos arancelarios
      // 3. Base imponible IGV
      // 4. IGV
      // 5. Total de impuestos
      const res = calculateCustomsTaxes(values);

      // Guardamos los resultados en el estado
      // Esto provocará que el componente se re-renderice y muestre los resultados
      setResult(res);
    } finally {
      // Desactivamos el indicador de carga
      // El bloque finally se ejecuta siempre, haya error o no
      setIsLoading(false);
    }
  };

  // ============================================================================
  // RETORNO DEL HOOK
  // ============================================================================

  // Retornamos un objeto con todo lo que el componente necesita:
  // - result: Los resultados del cálculo (o null)
  // - isLoading: Si está calculando
  // - calculate: Función para ejecutar un nuevo cálculo
  return { result, isLoading, calculate };
}
