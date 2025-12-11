import { ImportCalculatorInput, ImportCostBreakdown } from "../types";
import tarifas from "../../../data/tarifas_importacion.json";
import categorias from "../../../data/categorias_producto.json";
import variablesGlobales from "../../../data/variables_globales.json";

// Type definitions for JSON data
type TariffTier = {
    origen: string;
    rango_cbm_min: number;
    rango_cbm_max: number;
    flete_base_usd: number;
    gastos_origen_usd: number;
    gastos_destino_usd: number;
    nota?: string;
};

type ProductCategory = {
    id: string;
    name: string;
    arancel_base_pct: number;
    seguro_factor: number;
};

export type CalculationOverrides = {
    perceptionRate?: number;
    insuranceRate?: number;
};

export const calculateImportCosts = (input: ImportCalculatorInput, overrides?: CalculationOverrides): ImportCostBreakdown => {
    const { fobValue, category, cbm, origin, quantity } = input;

    // 1. Find Tariff Tier
    const tariff = (tarifas as TariffTier[]).find(
        (t) =>
            t.origen === origin &&
            cbm >= t.rango_cbm_min &&
            cbm < t.rango_cbm_max
    );

    // Fallback if no specific tier found
    const appliedTariff = tariff || (tarifas as TariffTier[]).find(t => t.origen === 'default')!;

    const freight = appliedTariff.flete_base_usd;

    const originExpenses = appliedTariff.gastos_origen_usd;
    const destinationExpenses = appliedTariff.gastos_destino_usd;

    // 2. Get Product Category Rules
    const productCat = (categorias as ProductCategory[]).find((c) => c.id === category);
    const arancelPct = (productCat?.arancel_base_pct || 0) / 100;

    // Insurance
    const defaultInsuranceRate = productCat?.seguro_factor || variablesGlobales.seguro_default_pct;
    const insuranceRate = overrides?.insuranceRate !== undefined ? overrides.insuranceRate : defaultInsuranceRate;

    // 3. Calculate Insurance
    // Rule: Insurance = (FOB + Freight) * Rate
    const insurance = (fobValue + freight) * insuranceRate;

    // 4. Calculate CIF
    const cif = fobValue + freight + insurance;

    // 5. Calculate Taxes
    const adValorem = cif * arancelPct;
    const baseIgv = cif + adValorem;

    // IGV + IPM (16% + 2% = 18%)
    const igvRate = variablesGlobales.igv_pct + variablesGlobales.ipm_pct;
    const igv = baseIgv * igvRate;

    // Perception
    // Check override
    const defaultPerceptionRate = variablesGlobales.percepcion_base_pct;
    const perceptionRate = overrides?.perceptionRate !== undefined ? overrides.perceptionRate : defaultPerceptionRate;

    const perceptionBase = baseIgv + igv;
    const perception = perceptionBase * perceptionRate;

    const totalTaxes = adValorem + igv + perception;

    // 6. Total Landed Cost
    const otherExpenses = 0;

    const totalLandedCostUSD = cif + adValorem + igv + perception + originExpenses + destinationExpenses;
    const exchangeRate = variablesGlobales.tasa_cambio_referencial;
    const totalLandedCostSOL = totalLandedCostUSD * exchangeRate;

    return {
        fob: fobValue,
        freight,
        insurance,
        cif,
        adValorem,
        igv,
        perception,
        totalTaxes,
        originExpenses,
        destinationExpenses,
        otherExpenses,
        totalLandedCostUSD,
        totalLandedCostSOL,
        unitCostUSD: quantity ? totalLandedCostUSD / quantity : totalLandedCostUSD,
        exchangeRate,
        cbmRef: cbm
    };
};
