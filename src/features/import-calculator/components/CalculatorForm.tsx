"use client";

import React, { useState, useEffect } from "react";
import categorias from "../../../data/categorias_producto.json";
import variablesGlobales from "../../../data/variables_globales.json";
import { ImportCalculatorInput } from "../types";

// Helper for CBM size preset
const CBM_PRESETS = [
    { label: "Pequeño (Caja chica)", value: 0.1 },
    { label: "Mediano (1 CBM)", value: 1.0 },
    { label: "Grande (3 CBM)", value: 3.0 },
];

type Props = {
    onCalculate: (data: ImportCalculatorInput) => void;
};

export const CalculatorForm: React.FC<Props> = ({ onCalculate }) => {
    const [formData, setFormData] = useState<ImportCalculatorInput>({
        category: categorias[0].id,
        fobValue: 1000,
        cbm: 0.1,
        origin: variablesGlobales.zonas_china[0],
        destination: variablesGlobales.ciudades_peru[0],
        quantity: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "fobValue" || name === "cbm" || name === "quantity" ? Number(value) : value,
        }));
    };

    // Auto-submit on change or manual submit? 
    // Let's do manual submit for distinct action, or auto-debounce.
    // Start with a 'Calcular' button for clarity.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCalculate(formData);
    };

    // Trigger calculation on mount or when convenient? 
    // Let user click.

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Categoría del Producto</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-slate-500">
                        {categorias.find(c => c.id === formData.category)?.descripcion}
                    </p>
                </div>

                {/* FOB Value */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Valor FOB (USD)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-400">$</span>
                        <input
                            type="number"
                            name="fobValue"
                            value={formData.fobValue}
                            onChange={handleChange}
                            min="0"
                            className="w-full pl-8 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* CBM / Size */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Volumen (CBM)</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="cbm"
                            value={formData.cbm}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            className="w-24 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <div className="flex-1 flex gap-1">
                            {CBM_PRESETS.map((preset) => (
                                <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => setFormData(d => ({ ...d, cbm: preset.value }))}
                                    className={`text-xs px-2 py-1 rounded border ${formData.cbm === preset.value ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                                >
                                    {preset.label.split("(")[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quantity (Optional for Unit Cost) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Cantidad (Unidades)</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Origin */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Origen (China)</label>
                    <select
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        {variablesGlobales.zonas_china.map((z) => (
                            <option key={z} value={z}>{z}</option>
                        ))}
                    </select>
                </div>

                {/* Destination */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Destino (Perú)</label>
                    <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        {variablesGlobales.ciudades_peru.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
                Calcular Costos de Importación
            </button>
        </form>
    );
};
