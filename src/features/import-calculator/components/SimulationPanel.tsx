"use client";

import React from "react";
import { ImportCostBreakdown } from "../types";
import { CalculationOverrides } from "../utils/calculateCosts";

type Props = {
    overrides: CalculationOverrides;
    onUpdate: (overrides: CalculationOverrides) => void;
};

export const SimulationPanel: React.FC<Props> = ({ overrides, onUpdate }) => {
    const currentPerception = overrides.perceptionRate;

    // Helper to toggle perception
    const setPerception = (rate: number | undefined) => {
        onUpdate({ ...overrides, perceptionRate: rate });
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Simulador de Escenarios</h3>
                    <p className="text-slate-500 text-sm">Ajusta variables clave para optimizar costos.</p>
                </div>
                <span className="text-xs font-bold text-violet-600 px-2 py-1 bg-violet-50 rounded border border-violet-100 uppercase tracking-wide">
                    Modo Simulación
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Perception Toggles */}
                <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                    <label className="text-sm font-semibold text-slate-700 block mb-3">Tasa de Percepción</label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setPerception(undefined)} // Default (usually 10% or whatever logic)
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPerception === undefined ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            Auto (Default)
                        </button>
                        <button
                            onClick={() => setPerception(0.10)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPerception === 0.10 ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            10% (Inicial)
                        </button>
                        <button
                            onClick={() => setPerception(0.035)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPerception === 0.035 ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            3.5% (Frecuente)
                        </button>
                        <button
                            onClick={() => setPerception(0)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPerception === 0 ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            0% (Exonerado)
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                        Nota: La tasa del 10% aplica a tu primera importación. A partir de la segunda, suele bajar al 3.5%.
                    </p>
                </div>

                {/* Placeholder for other sliders */}
                <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm opacity-50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] z-10">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest border px-2 py-1 rounded">Próximamente</span>
                    </div>
                    <label className="text-sm font-semibold text-slate-700 block mb-3">Negociación de Flete</label>
                    <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-not-allowed" disabled />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>-20%</span>
                        <span>Actual</span>
                        <span>+20%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
