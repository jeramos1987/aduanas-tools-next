/**
 * ============================================================================
 * CÁLCULO DEL VALOR EN ADUANA (VALOR CIF)
 * ============================================================================
 * Este módulo calcula el Valor en Aduana, también conocido como Valor CIF
 * (Cost, Insurance and Freight - Costo, Seguro y Flete).
 * 
 * El Valor en Aduana es la base sobre la cual se calculan todos los impuestos
 * de importación. Es uno de los conceptos más importantes en comercio exterior.
 */

import type { CustomsInput } from "./types";

/**
 * calculateCustomsValue - Calcula el Valor en Aduana (Valor CIF)
 * 
 * FÓRMULA:
 * Valor en Aduana = FOB + Flete + Seguro + Otros Costos
 * 
 * EXPLICACIÓN:
 * - FOB: Es el valor de la mercancía en el puerto de origen
 * - Flete: Costo del transporte internacional
 * - Seguro: Costo del seguro de la mercancía
 * - Otros Costos: Gastos adicionales (comisiones, embalajes, etc.)
 * 
 * EJEMPLO PRÁCTICO:
 * Si importas productos con:
 * - FOB: $1000 (valor de los productos)
 * - Flete: $200 (envío marítimo)
 * - Seguro: $50 (seguro de carga)
 * - Otros: $0 (sin gastos adicionales)
 * 
 * Valor en Aduana = $1000 + $200 + $50 + $0 = $1250 USD
 * 
 * @param input - Objeto con los datos de la importación (FOB, flete, seguro, etc.)
 * @returns El Valor en Aduana calculado (número en USD)
 */
export function calculateCustomsValue(input: CustomsInput): number {
  // Extraemos los valores del objeto de entrada
  // Si otherCosts no viene definido, usamos 0 como valor por defecto
  const { fob, freight, insurance, otherCosts = 0 } = input;

  // Aplicamos la fórmula del Valor CIF
  // Esta es la suma simple de todos los componentes
  return fob + freight + insurance + otherCosts;
}
