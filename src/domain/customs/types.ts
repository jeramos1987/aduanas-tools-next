export type CustomsInput = {
  fob: number;
  freight: number;
  insurance: number;
  otherCosts?: number; // gastos adicionales opcionales
  dutyRate: number;    // ej. 0.06, 0.11
  igvRate: number;     // ej. 0.18
};

export type CustomsResult = {
  customsValue: number; // Valor en Aduana
  duty: number;         // Derechos ad valorem
  igvBase: number;      // Base imponible IGV
  igv: number;          // IGV calculado
  totalTaxes: number; // duty + igv
};
