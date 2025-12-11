export type ImportCalculatorInput = {
    category: string;
    fobValue: number;
    cbm: number; // Cubic meters
    origin: string;
    destination: string;
    quantity?: number; // Optional, for unit cost calculation
};

export type ImportCostBreakdown = {
    // Base Inputs
    fob: number;

    // International Logistics
    freight: number;
    insurance: number;

    // Customs Value
    cif: number;

    // Taxes (Tributos)
    adValorem: number;
    igv: number;      // Includes IPM
    perception: number;
    totalTaxes: number; // adValorem + igv + perception (cashflow needed)

    // Local Expenses
    originExpenses: number;
    destinationExpenses: number;
    otherExpenses: number; // Agente aduana, transporte interno, etc.

    // Totals
    totalLandedCostUSD: number;
    totalLandedCostSOL: number;
    unitCostUSD: number;

    // Metadata for display
    exchangeRate: number;
    cbmRef: number;
};
