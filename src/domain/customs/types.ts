/**
 * ============================================================================
 * TIPOS DE DATOS PARA EL DOMINIO DE ADUANAS
 * ============================================================================
 * Este archivo define las estructuras de datos que se usan en toda la
 * aplicación para manejar cálculos aduaneros.
 */

/**
 * CustomsInput - Datos de entrada para calcular impuestos aduaneros
 * 
 * Representa toda la información necesaria para calcular el valor en aduana
 * y los impuestos correspondientes de una importación.
 */
export type CustomsInput = {
  /** 
   * FOB (Free On Board) - Valor de la mercancía en el puerto de origen
   * Es el precio de venta sin incluir flete ni seguro
   * Ejemplo: Si compras productos por $1000 USD, ese es tu FOB
   */
  fob: number;

  /** 
   * Flete - Costo del transporte internacional
   * Es lo que pagas por traer la mercancía desde el origen hasta el puerto de destino
   * Ejemplo: $200 USD por el envío marítimo o aéreo
   */
  freight: number;

  /** 
   * Seguro - Costo del seguro de la mercancía durante el transporte
   * Protege tu carga en caso de daños o pérdidas durante el envío
   * Ejemplo: $50 USD para asegurar la mercancía
   */
  insurance: number;

  /** 
   * Otros costos - Gastos adicionales que se suman al valor en aduana (OPCIONAL)
   * Pueden incluir: comisiones, embalajes especiales, certificaciones, etc.
   * Si no hay otros costos, este campo puede ser 0 o no enviarse
   */
  otherCosts?: number;

  /** 
   * Tasa ad valorem - Porcentaje de derechos arancelarios
   * Es el impuesto que cobra la aduana sobre el valor CIF (Valor en Aduana)
   * Se expresa en decimal: 6% = 0.06, 11% = 0.11
   * Este porcentaje varía según el tipo de producto (partida arancelaria)
   */
  dutyRate: number;

  /** 
   * Tasa IGV - Porcentaje del Impuesto General a las Ventas
   * En Perú es 18% = 0.18
   * Se aplica sobre la base imponible (Valor en Aduana + Derechos)
   */
  igvRate: number;
};

/**
 * CustomsResult - Resultado del cálculo de impuestos aduaneros
 * 
 * Contiene todos los valores calculados que necesitas saber para una importación:
 * cuánto pagarás en total, desglosado por cada concepto.
 */
export type CustomsResult = {
  /** 
   * Valor en Aduana (VA) o Valor CIF
   * Es la suma de: FOB + Flete + Seguro + Otros costos
   * Este es el valor base sobre el cual se calculan los impuestos
   * Ejemplo: $1000 + $200 + $50 + $0 = $1250 USD
   */
  customsValue: number;

  /** 
   * Derechos arancelarios (Ad Valorem)
   * Es el impuesto que cobra la aduana = Valor en Aduana × Tasa ad valorem
   * Ejemplo: $1250 × 0.06 = $75 USD
   */
  duty: number;

  /** 
   * Base imponible para el IGV
   * Es la suma de: Valor en Aduana + Derechos arancelarios
   * Sobre este monto se calcula el IGV
   * Ejemplo: $1250 + $75 = $1325 USD
   */
  igvBase: number;

  /** 
   * IGV (Impuesto General a las Ventas)
   * Es el impuesto = Base imponible IGV × Tasa IGV
   * Ejemplo: $1325 × 0.18 = $238.50 USD
   */
  igv: number;

  /** 
   * Total de impuestos a pagar
   * Es la suma de: Derechos arancelarios + IGV
   * Este es el monto total que pagarás a la aduana
   * Ejemplo: $75 + $238.50 = $313.50 USD
   */
  totalTaxes: number;
};
