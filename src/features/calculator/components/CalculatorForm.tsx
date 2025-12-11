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
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* ===== SECCIÓN 1: DATOS PARA EL VALOR EN ADUANA ===== */}

      {/* Campo FOB - Valor de la mercancía */}
      <Field label="FOB (USD)" value={fob} onChange={setFob} />

      {/* Campo Flete - Costo del transporte */}
      <Field label="Flete (USD)" value={freight} onChange={setFreight} />

      {/* Campo Seguro - Costo del seguro */}
      <Field label="Seguro (USD)" value={insurance} onChange={setInsurance} />

      {/* Campo Otros costos - Gastos adicionales */}
      <Field label="Otros costos (USD)" value={otherCosts} onChange={setOtherCosts} />

      {/* ===== VISTA PREVIA DEL VALOR EN ADUANA ===== */}
      {/* Mostramos el Valor en Aduana calculado en tiempo real */}
      <div className="p-3 border rounded bg-gray-50">
        <p className="text-sm text-gray-600">Valor en Aduana (VA):</p>
        <p className="text-xl font-bold">USD {customsValue.toFixed(2)}</p>
      </div>

      {/* ===== SECCIÓN 2: TASAS DE IMPUESTOS ===== */}

      {/* Campo Tasa ad valorem - Porcentaje de derechos arancelarios */}
      <Field
        label="Tasa ad valorem (ej. 0.06 para 6%)"
        value={dutyRate}
        onChange={setDutyRate}
      />

      {/* Campo Tasa IGV - Porcentaje del IGV */}
      <Field
        label="Tasa IGV (ej. 0.18 para 18%)"
        value={igvRate}
        onChange={setIgvRate}
      />

      {/* ===== BOTÓN DE ENVÍO ===== */}
      {/* Al hacer clic, se ejecuta handleSubmit que envía los datos al padre */}
      <button type="submit" className="border rounded px-4 py-2 mt-2">
        Calcular tributos
      </button>
    </form>
  );
}

// ============================================================================
// COMPONENTE AUXILIAR: FIELD
// ============================================================================

/**
 * Props del componente Field
 */
type FieldProps = {
  /** Etiqueta que se muestra arriba del campo */
  label: string;
  /** Valor actual del campo */
  value: string;
  /** Función que se ejecuta cuando el usuario cambia el valor */
  onChange: (v: string) => void;
};

/**
 * Field - Componente reutilizable para campos de entrada numéricos
 * 
 * Este componente encapsula la lógica común de todos los campos:
 * - Etiqueta descriptiva
 * - Input de tipo número con decimales
 * - Estilos consistentes
 * 
 * @param label - Texto de la etiqueta
 * @param value - Valor actual del campo
 * @param onChange - Callback cuando cambia el valor
 */
function Field({ label, value, onChange }: FieldProps) {
  return (
    <div className="space-y-1">
      {/* Etiqueta del campo */}
      <label className="block text-sm font-medium">{label}</label>

      {/* Input numérico */}
      <input
        className="border rounded px-2 py-1 w-full"
        type="number"           // Solo permite números
        step="0.01"             // Permite decimales con 2 dígitos
        value={value}           // Valor controlado por React
        onChange={(e) => onChange(e.target.value)} // Actualiza el estado al cambiar
      />
    </div>
  );
}