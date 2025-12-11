/**
 * ============================================================================
 * PANTALLA PRINCIPAL DE LA CALCULADORA ADUANERA
 * ============================================================================
 * Este es el componente principal que orquesta toda la funcionalidad
 * de la calculadora. Integra el formulario y la lógica de cálculo.
 */

"use client";

import { useCalculator } from "../hooks/useCalculator";
import { CalculatorForm } from "./CalculatorForm";

/**
 * CalculatorScreen - Componente principal de la calculadora
 * 
 * ARQUITECTURA:
 * - Usa el hook useCalculator para manejar el estado y la lógica de cálculo
 * - Renderiza el formulario (CalculatorForm) y le pasa la función de cálculo
 * - Muestra los resultados cuando están disponibles
 * 
 * FLUJO DE DATOS:
 * 1. Usuario llena el formulario (CalculatorForm)
 * 2. Usuario hace clic en "Calcular tributos"
 * 3. Se ejecuta la función calculate() del hook
 * 4. El hook calcula los impuestos y actualiza el estado
 * 5. Los resultados se muestran en pantalla
 */
export function CalculatorScreen() {
  // ============================================================================
  // HOOK PERSONALIZADO
  // ============================================================================
  // useCalculator nos proporciona:
  // - result: Los resultados del cálculo (null si aún no se ha calculado)
  // - isLoading: Indica si está calculando (útil para mostrar un spinner)
  // - calculate: Función para ejecutar el cálculo con los datos del formulario
  const { result, isLoading, calculate } = useCalculator();

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== ENCABEZADO ===== */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🧮</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 mb-2">
            Calculadora de Aduanas
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Calcula el valor en aduana (CIF), derechos arancelarios e IGV de tus importaciones
          </p>
        </div>

        {/* ===== FORMULARIO DE ENTRADA ===== */}
        {/* Pasamos la función calculate como callback onSubmit */}
        {/* Cuando el usuario envía el formulario, se ejecuta calculate() */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 p-6 md:p-8 mb-8 border border-white">
          <CalculatorForm onSubmit={calculate} />
        </div>

        {/* ===== INDICADOR DE CARGA ===== */}
        {/* Mostramos "Calculando…" mientras isLoading es true */}
        {/* En la práctica, el cálculo es tan rápido que esto casi nunca se ve */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
            <p className="mt-2 text-violet-500 font-medium">Calculando…</p>
          </div>
        )}

        {/* ===== RESULTADOS DEL CÁLCULO ===== */}
        {/* Solo mostramos los resultados si result no es null */}
        {/* result contiene: customsValue, duty, igvBase, igv, totalTaxes */}
        {result && (
          <div className="space-y-4 animate-fade-in">
            {/* Título de resultados */}
            <h2 className="text-2xl font-bold text-slate-700 mb-4">
              ✨ Resultados del Cálculo
            </h2>

            {/* Grid de tarjetas de resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tarjeta: Valor en Aduana */}
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-sky-100 border border-sky-50">
                <div className="text-sm font-bold text-sky-500 mb-1 uppercase tracking-wide">
                  Valor en Aduana (CIF)
                </div>
                <div className="text-3xl font-extrabold text-slate-800">
                  ${result.customsValue.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-2 font-medium">
                  FOB + Flete + Seguro + Otros
                </div>
              </div>

              {/* Tarjeta: Derechos Arancelarios */}
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-violet-100 border border-violet-50">
                <div className="text-sm font-bold text-violet-500 mb-1 uppercase tracking-wide">
                  Derechos Arancelarios
                </div>
                <div className="text-3xl font-extrabold text-slate-800">
                  ${result.duty.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-2 font-medium">
                  Ad Valorem
                </div>
              </div>

              {/* Tarjeta: Base IGV */}
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-pink-100 border border-pink-50">
                <div className="text-sm font-bold text-pink-400 mb-1 uppercase tracking-wide">
                  Base Imponible IGV
                </div>
                <div className="text-3xl font-extrabold text-slate-800">
                  ${result.igvBase.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-2 font-medium">
                  Valor Aduana + Derechos
                </div>
              </div>

              {/* Tarjeta: IGV + IPM */}
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-100 border border-orange-50">
                <div className="text-sm font-bold text-orange-400 mb-1 uppercase tracking-wide">
                  IGV + IPM
                </div>
                <div className="text-3xl font-extrabold text-slate-800">
                  ${result.igv.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-2 font-medium">
                  Impuesto General a las Ventas
                </div>
              </div>

              {/* Tarjeta: Percepción */}
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-emerald-100 border border-emerald-50 lg:col-span-2">
                <div className="text-sm font-bold text-emerald-500 mb-1 uppercase tracking-wide">
                  Percepción del IGV
                </div>
                <div className="text-3xl font-extrabold text-slate-800">
                  ${result.perception.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-2 font-medium">
                  Adelanto de impuesto (Se usa como crédito fiscal)
                </div>
              </div>
            </div>

            {/* Tarjeta destacada: Total a Pagar */}
            <div className="mt-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl p-8 text-white shadow-2xl shadow-violet-200 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
                  <circle cx="100" cy="100" r="100" />
                </svg>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                <div>
                  <div className="text-violet-100 font-medium mb-1 text-lg">Total a Pagar (Cashflow)</div>
                  <div className="text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-sm">
                    ${result.totalAmount.toFixed(2)}
                  </div>
                  <div className="mt-2 text-violet-100 font-medium opacity-90">
                    Monto líquido necesario para levantar la mercancía
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                  <div className="flex justify-between items-center mb-2 border-b border-white/20 pb-2">
                    <span className="text-violet-100">Tributos Aduaneros:</span>
                    <span className="font-bold text-xl text-white">${result.totalTaxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-violet-100">Percepción:</span>
                    <span className="font-bold text-xl text-white">${result.perception.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💡</div>
                <div className="flex-1">
                  <div className="font-bold text-sky-700 mb-1">
                    Información Importante
                  </div>
                  <p className="text-sm text-sky-600">
                    Estos cálculos son referenciales. Los valores finales pueden variar según
                    la partida arancelaria específica de tu producto y las regulaciones vigentes.
                    Consulta con un agente de aduanas para información precisa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
