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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== ENCABEZADO ===== */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🧮</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Calculadora de Aduanas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calcula el valor en aduana (CIF), derechos arancelarios e IGV de tus importaciones
          </p>
        </div>

        {/* ===== FORMULARIO DE ENTRADA ===== */}
        {/* Pasamos la función calculate como callback onSubmit */}
        {/* Cuando el usuario envía el formulario, se ejecuta calculate() */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <CalculatorForm onSubmit={calculate} />
        </div>

        {/* ===== INDICADOR DE CARGA ===== */}
        {/* Mostramos "Calculando…" mientras isLoading es true */}
        {/* En la práctica, el cálculo es tan rápido que esto casi nunca se ve */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Calculando…</p>
          </div>
        )}

        {/* ===== RESULTADOS DEL CÁLCULO ===== */}
        {/* Solo mostramos los resultados si result no es null */}
        {/* result contiene: customsValue, duty, igvBase, igv, totalTaxes */}
        {result && (
          <div className="space-y-4 animate-fade-in">
            {/* Título de resultados */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📊 Resultados del Cálculo
            </h2>

            {/* Grid de tarjetas de resultados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tarjeta: Valor en Aduana */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="text-sm font-semibold text-blue-700 mb-1">
                  Valor en Aduana (CIF)
                </div>
                <div className="text-3xl font-bold text-blue-900">
                  ${result.customsValue.toFixed(2)}
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  FOB + Flete + Seguro + Otros
                </div>
              </div>

              {/* Tarjeta: Derechos Arancelarios */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="text-sm font-semibold text-purple-700 mb-1">
                  Derechos Arancelarios
                </div>
                <div className="text-3xl font-bold text-purple-900">
                  ${result.duty.toFixed(2)}
                </div>
                <div className="text-xs text-purple-600 mt-2">
                  Ad Valorem
                </div>
              </div>

              {/* Tarjeta: Base IGV */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="text-sm font-semibold text-green-700 mb-1">
                  Base Imponible IGV
                </div>
                <div className="text-3xl font-bold text-green-900">
                  ${result.igvBase.toFixed(2)}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  Valor Aduana + Derechos
                </div>
              </div>

              {/* Tarjeta: IGV */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <div className="text-sm font-semibold text-orange-700 mb-1">
                  IGV (18%)
                </div>
                <div className="text-3xl font-bold text-orange-900">
                  ${result.igv.toFixed(2)}
                </div>
                <div className="text-xs text-orange-600 mt-2">
                  Impuesto General a las Ventas
                </div>
              </div>
            </div>

            {/* Tarjeta destacada: Total de Impuestos */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold mb-2">
                    💰 Total de Impuestos a Pagar
                  </div>
                  <div className="text-5xl font-bold">
                    ${result.totalTaxes.toFixed(2)}
                  </div>
                  <div className="text-sm text-blue-100 mt-2">
                    Derechos + IGV
                  </div>
                </div>
                <div className="text-6xl opacity-20">
                  🚢
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💡</div>
                <div className="flex-1">
                  <div className="font-semibold text-blue-900 mb-1">
                    Información Importante
                  </div>
                  <p className="text-sm text-blue-700">
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
