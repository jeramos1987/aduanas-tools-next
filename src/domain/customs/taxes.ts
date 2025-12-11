/**
 * ============================================================================
 * CÁLCULO DE IMPUESTOS ADUANEROS
 * ============================================================================
 * Este módulo calcula todos los impuestos que debes pagar al importar mercancía.
 * Incluye: Derechos arancelarios (Ad Valorem) e IGV (Impuesto General a las Ventas).
 */

import type { CustomsInput, CustomsResult } from "./types";
import { calculateCustomsValue } from "./value";

/**
 * calculateCustomsTaxes - Calcula todos los impuestos de una importación
 * 
 * PROCESO DE CÁLCULO (paso a paso):
 * 
 * 1. Calcular el Valor en Aduana (Valor CIF)
 *    Valor en Aduana = FOB + Flete + Seguro + Otros costos
 * 
 * 2. Calcular los Derechos Arancelarios (Ad Valorem)
 *    Derechos = Valor en Aduana × Tasa ad valorem
 * 
 * 3. Calcular la Base Imponible para el IGV
 *    Base IGV = Valor en Aduana + Derechos
 * 
 * 4. Calcular el IGV
 *    IGV = Base IGV × Tasa IGV
 * 
 * 5. Calcular el Total de Impuestos
 *    Total = Derechos + IGV
 * 
 * EJEMPLO COMPLETO:
 * Datos de entrada:
 * - FOB: $1000
 * - Flete: $200
 * - Seguro: $50
 * - Tasa ad valorem: 6% (0.06)
 * - Tasa IGV: 18% (0.18)
 * 
 * Cálculos:
 * 1. Valor en Aduana = $1000 + $200 + $50 = $1250
 * 2. Derechos = $1250 × 0.06 = $75
 * 3. Base IGV = $1250 + $75 = $1325
 * 4. IGV = $1325 × 0.18 = $238.50
 * 5. Total impuestos = $75 + $238.50 = $313.50
 * 
 * @param input - Datos de la importación (FOB, flete, seguro, tasas, etc.)
 * @returns Objeto con todos los valores calculados desglosados
 */
export function calculateCustomsTaxes(input: CustomsInput): CustomsResult {
  // PASO 1: Calcular el Valor en Aduana (Valor CIF)
  // Usamos la función especializada que suma FOB + Flete + Seguro + Otros
  const customsValue = calculateCustomsValue(input);

  // PASO 2: Calcular los Derechos Arancelarios (Ad Valorem)
  // Los derechos se calculan como un porcentaje del Valor en Aduana
  // Ejemplo: Si Valor en Aduana = $1250 y tasa = 0.06 (6%)
  //          entonces Derechos = $1250 × 0.06 = $75
  const duty = customsValue * input.dutyRate;

  // PASO 3: Calcular la Base Imponible para el IGV
  // El IGV se calcula sobre el Valor en Aduana MÁS los Derechos
  // Esto significa que pagas IGV sobre los impuestos (impuesto sobre impuesto)
  // Ejemplo: Base IGV = $1250 + $75 = $1325
  const igvBase = customsValue + duty;

  // PASO 4: Calcular el IGV (Impuesto General a las Ventas)
  // El IGV es un porcentaje de la base imponible
  // En Perú es 18% (0.18)
  // Ejemplo: IGV = $1325 × 0.18 = $238.50
  const igv = igvBase * input.igvRate;

  // PASO 5: Calcular el Total de Impuestos a Pagar (Tributos)
  // Es la suma de todos los impuestos: Derechos + IGV
  // Este es el monto total que pagarás a la aduana por concepto de deuda tributaria
  const totalTaxes = duty + igv;

  // PASO 6: Calcular la Percepción
  // La percepción se aplica sobre el precio de venta total (CIF + Impuestos)
  // Base Percepción = Valor en Aduana + Derechos + IGV
  // Ejemplo: Base = $1250 + $75 + $238.50 = $1563.50
  // Percepción = $1563.50 × 0.035 = $54.72
  const perceptionBase = customsValue + totalTaxes;
  const perception = perceptionBase * input.perceptionRate;

  // PASO 7: Calcular el Total a Pagar (Cashflow)
  // Es lo que realmente debe desembolsar el importador para levantar la mercancía
  const totalAmount = totalTaxes + perception;

  // Retornamos un objeto con todos los valores calculados
  // Esto permite mostrar el desglose completo al usuario
  return {
    customsValue,  // Valor en Aduana (base de cálculo)
    duty,          // Derechos arancelarios
    igvBase,       // Base para calcular el IGV
    igv,           // IGV calculado
    totalTaxes,    // Total impuestos (duty + igv)
    perception,    // Monto de percepción calculado
    totalAmount    // Total general a pagar
  };
}
