/**
 * ============================================================================
 * FORMULARIO DE CALCULADORA ADUANERA
 * ============================================================================
 * Este componente maneja el formulario principal donde el usuario ingresa
 * todos los datos necesarios para calcular los impuestos de importación.
 * 
 * CARACTERÍSTICAS:
 * - Campos para FOB, Flete, Seguro, Otros costos, Tasas de impuestos
 * - Vista previa en tiempo real del Valor en Aduana
 * - Validación automática de números
 * - Valores por defecto para facilitar pruebas
 */

"use client";

import { FormEvent, useState } from "react";
import type { CalculatorFormValues } from "../types";
import { calculateCustomsValue } from "@/domain/customs/value";
import type { CustomsInput } from "@/domain/customs/types";

/**
 * Props del componente CalculatorForm
 */
type Props = {
  /** Función que se ejecuta cuando el usuario envía el formulario */
  onSubmit: (values: CalculatorFormValues) => void;
};

/**
 * CalculatorForm - Componente del formulario de cálculo aduanero
 * 
 * FUNCIONAMIENTO:
 * 1. El usuario ingresa los valores en los campos
 * 2. Se muestra una vista previa del Valor en Aduana en tiempo real
 * 3. Al hacer clic en "Calcular tributos", se envían los datos al componente padre
 * 4. El componente padre se encarga de calcular todos los impuestos
 * 
 * @param onSubmit - Callback que recibe los valores del formulario
 */
export function CalculatorForm({ onSubmit }: Props) {
  // ============================================================================
  // ESTADO DEL COMPONENTE
  // ============================================================================
  // Cada campo del formulario tiene su propio estado (useState)
  // Los valores por defecto facilitan las pruebas rápidas

  /** FOB - Valor de la mercancía (valor por defecto: $1000) */
  const [fob, setFob] = useState("1000");

  /** Flete - Costo del transporte (valor por defecto: $200) */
  const [freight, setFreight] = useState("200");

  /** Seguro - Costo del seguro (valor por defecto: $50) */
  const [insurance, setInsurance] = useState("50");

  /** Otros costos - Gastos adicionales (valor por defecto: $0) */
  const [otherCosts, setOtherCosts] = useState("0");

  /** Tasa ad valorem - Porcentaje de derechos arancelarios (valor por defecto: 6%) */
  const [dutyRate, setDutyRate] = useState("0.06");

  /** Tasa IGV - Porcentaje del IGV (valor por defecto: 18%) */
  const [igvRate, setIgvRate] = useState("0.18");

  /** Tasa Percepción - Porcentaje de percepción (valor por defecto: 3.5%) */
  const [perceptionRate, setPerceptionRate] = useState("0.035");

  // ============================================================================
  // VISTA PREVIA DEL VALOR EN ADUANA
  // ============================================================================
  // Construimos un objeto compatible con CustomsInput para calcular
  // el Valor en Aduana en tiempo real mientras el usuario escribe

  const previewInput: CustomsInput = {
    fob: Number(fob) || 0,              // Convertimos string a número, si falla usamos 0
    freight: Number(freight) || 0,
    insurance: Number(insurance) || 0,
    otherCosts: Number(otherCosts) || 0,
    dutyRate: Number(dutyRate) || 0,    // Aunque no se usa para el VA, el tipo lo requiere
    igvRate: Number(igvRate) || 0,
    perceptionRate: Number(perceptionRate) || 0,
  };

  // Calculamos el Valor en Aduana usando la lógica de negocio del dominio
  // Esto se actualiza automáticamente cada vez que el usuario cambia un campo
  const customsValue = calculateCustomsValue(previewInput);

  // ============================================================================
  // MANEJO DEL ENVÍO DEL FORMULARIO
  // ============================================================================

  /**
   * handleSubmit - Se ejecuta cuando el usuario hace clic en "Calcular tributos"
   * 
   * @param e - Evento del formulario
   */
  const handleSubmit = (e: FormEvent) => {
    // Prevenimos el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault();

    // Enviamos los datos al componente padre (ya tenemos el objeto listo)
    onSubmit(previewInput);
  };

  // ============================================================================
  // RENDERIZADO DEL FORMULARIO
  // ============================================================================

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* ===== SECCIÓN 1: DATOS DEL ENVÍO ===== */}
      <section>
        <h3 className="text-lg font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">
          🚢 Datos del Envío
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo FOB */}
          <Field label="FOB (USD)" value={fob} onChange={setFob} placeholder="Valor mercancía" />

          {/* Campo Flete */}
          <Field label="Flete (USD)" value={freight} onChange={setFreight} placeholder="Costo transporte" />

          {/* Campo Seguro */}
          <Field label="Seguro (USD)" value={insurance} onChange={setInsurance} placeholder="Costo seguro" />

          {/* Campo Otros costos */}
          <Field label="Otros costos (USD)" value={otherCosts} onChange={setOtherCosts} placeholder="Gastos extra" />
        </div>
      </section>

      {/* ===== VISTA PREVIA DEL VALOR EN ADUANA ===== */}
      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm font-bold text-sky-600">Valor en Aduana (CIF)</p>
          <p className="text-xs text-sky-400 font-medium">Base para impuestos</p>
        </div>
        <div className="text-2xl font-black text-sky-700">
          $ {customsValue.toFixed(2)}
        </div>
      </div>

      {/* ===== SECCIÓN 2: TASAS E IMPUESTOS ===== */}
      <section>
        <h3 className="text-lg font-bold text-slate-700 mb-4 border-b border-slate-100 pb-2">
          ⚖️ Tasas e Impuestos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campo Tasa Ad Valorem */}
          <Field
            label="Ad Valorem"
            value={dutyRate}
            onChange={setDutyRate}
            step="0.001"
            hint="Ej. 0.06 = 6%, 0.11 = 11%"
          />

          {/* Campo Tasa IGV */}
          <Field
            label="IGV + IPM"
            value={igvRate}
            onChange={setIgvRate}
            step="0.01"
            hint="Generalmente 0.18 (18%)"
          />

          {/* Campo Tasa Percepción */}
          <Field
            label="Percepción"
            value={perceptionRate}
            onChange={setPerceptionRate}
            step="0.001"
            hint="3.5%, 10% o 0% según caso"
          />
        </div>
      </section>

      {/* ===== BOTÓN DE ENVÍO ===== */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🧮</span>
          <span>Calcular Tributos y Percepción</span>
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// COMPONENTE AUXILIAR: FIELD
// ============================================================================

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
  hint?: string;
};

function Field({ label, value, onChange, placeholder, step = "0.01", hint }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1">{label}</label>
      <input
        className="block w-full rounded-xl bg-slate-50 border-slate-200 text-slate-700 shadow-sm focus:border-violet-400 focus:ring-violet-400 focus:ring-opacity-50 sm:text-sm px-4 py-3 border transition-colors"
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}