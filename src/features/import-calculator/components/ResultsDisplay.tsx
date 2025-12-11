"use client";

import React from "react";
import { ImportCostBreakdown } from "../types";

type Props = {
    result: ImportCostBreakdown;
};

const Currency = ({ value, currency = "USD" }: { value: number; currency?: string }) => (
    <span className="font-mono">
        {currency === "USD" ? "$" : "S/"}
        {value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
);

export const ResultsDisplay: React.FC<Props> = ({ result }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* High Level Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl">
                    <p className="text-blue-100 text-sm font-medium mb-1">Costo Total Puesto en Perú</p>
                    <div className="text-3xl font-bold mb-2">
                        <Currency value={result.totalLandedCostUSD} />
                    </div>
                    <div className="text-blue-200 text-sm">
                        <Currency value={result.totalLandedCostSOL} currency="PEN" /> (T.C. {result.exchangeRate})
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg">
                    <p className="text-slate-500 text-sm font-medium mb-1">Costo Unitario Estimado</p>
                    <div className="text-3xl font-bold text-slate-800 mb-2">
                        <Currency value={result.unitCostUSD} />
                    </div>
                    <p className="text-slate-400 text-xs">
                        Basado en la cantidad ingresada
                    </p>
                </div>
            </div>

            {/* Breakdown Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 font-semibold text-slate-700">
                    Desglose de Costos
                </div>
                <div className="p-4 space-y-3">
                    {/* Valor CIF */}
                    <div className="pb-3 border-b border-slate-50">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Valor FOB</span>
                            <span className="font-medium"><Currency value={result.fob} /></span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Flete Internacional</span>
                            <span className="font-medium"><Currency value={result.freight} /></span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Seguro</span>
                            <span className="font-medium"><Currency value={result.insurance} /></span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-blue-600 mt-1">
                            <span>Valor CIF</span>
                            <span><Currency value={result.cif} /></span>
                        </div>
                    </div>

                    {/* Impuestos */}
                    <div className="pb-3 border-b border-slate-50">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Ad Valorem (Arancel)</span>
                            <span className="font-medium"><Currency value={result.adValorem} /></span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">IGV + IPM (18%)</span>
                            <span className="font-medium"><Currency value={result.igv} /></span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Percepción</span>
                            <span className="font-medium"><Currency value={result.perception} /></span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold text-red-600 mt-1">
                            <span>Total Impuestos (Cashflow)</span>
                            <span><Currency value={result.totalTaxes} /></span>
                        </div>
                    </div>

                    {/* Gastos Logísticos */}
                    <div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Gastos en Origen</span>
                            <span className="font-medium"><Currency value={result.originExpenses} /></span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Gastos en Destino</span>
                            <span className="font-medium"><Currency value={result.destinationExpenses} /></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-xs">
                <strong>Nota:</strong> Estos valores son estimados referenciales basados en tarifas promedio. El costo real puede variar según el agente de carga y aduanas.
            </div>
        </div>
    );
};
