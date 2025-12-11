"use client";

import React, { useState, useEffect } from "react";
import { CalculatorForm } from "../../../features/import-calculator/components/CalculatorForm";
import { ResultsDisplay } from "../../../features/import-calculator/components/ResultsDisplay";
import { SimulationPanel } from "../../../features/import-calculator/components/SimulationPanel";
import { calculateImportCosts, CalculationOverrides } from "../../../features/import-calculator/utils/calculateCosts";
import { ImportCalculatorInput, ImportCostBreakdown } from "../../../features/import-calculator/types";

export default function ImportCalculatorPage() {
    const [inputData, setInputData] = useState<ImportCalculatorInput | null>(null);
    const [result, setResult] = useState<ImportCostBreakdown | null>(null);
    const [overrides, setOverrides] = useState<CalculationOverrides>({});

    // Handlers
    const handleCalculate = (data: ImportCalculatorInput) => {
        setInputData(data);
        // Reset overrides when new calculation starts (optional, but cleaner)
        setOverrides({});
        const res = calculateImportCosts(data, {});
        setResult(res);
    };

    const handleOverrideUpdate = (newOverrides: CalculationOverrides) => {
        setOverrides(newOverrides);
        if (inputData) {
            const res = calculateImportCosts(inputData, newOverrides);
            setResult(res);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Hero */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Calculadora de Importaciones
                    </h1>
                    <p className="mt-2 text-lg text-slate-600 max-w-2xl">
                        Estima tus costos reales de importación desde China. Descubre cuánto te costará tu producto puesto en almacén.
                    </p>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-5 space-y-6">
                        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600 text-sm font-bold">1</span>
                            Ingresa los datos
                        </h2>
                        <CalculatorForm onCalculate={handleCalculate} />

                        {/* Tips / Info */}
                        <div className="bg-violet-50 p-4 rounded-lg border border-violet-100 text-sm text-violet-800">
                            <p className="font-semibold mb-1">💡 ¿No sabes el CBM?</p>
                            <p>El CBM es el volumen en metros cúbicos. Para una caja de 50x50x50cm, el CBM es 0.125.</p>
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-7">
                        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-6">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-sm font-bold">2</span>
                            Resultados y Análisis
                        </h2>

                        {!result ? (
                            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 border-dashed">
                                <div className="mx-auto h-12 w-12 text-slate-300 mb-3">
                                    {/* Icon placeholder */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-slate-500">Esperando datos...</p>
                                <p className="text-sm">Completa el formulario para ver el desglose de costos.</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <ResultsDisplay result={result} />

                                <SimulationPanel overrides={overrides} onUpdate={handleOverrideUpdate} />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
