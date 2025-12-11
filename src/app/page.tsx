/**
 * ============================================================================
 * PÁGINA DE INICIO
 * ============================================================================
 * Página principal del centro de herramientas.
 * Muestra un hero section, grid de herramientas disponibles y beneficios.
 */

import Link from "next/link";
import { TOOLS } from "@/config/tools";
import { ToolCard } from "@/components/ui/ToolCard";

/**
 * Home - Página principal del sitio
 * 
 * SECCIONES:
 * 1. Hero Section - Título principal y descripción
 * 2. Grid de Herramientas - Tarjetas de todas las herramientas
 * 3. Sección de Beneficios - Por qué usar estas herramientas
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center animate-fade-in">
            {/* Icono principal */}
            <div className="text-6xl md:text-8xl mb-6">🚢</div>

            {/* Título principal */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Centro de Herramientas
              <br />
              <span className="text-violet-200">para Importadores</span>
            </h1>

            {/* Descripción */}
            <p className="text-xl md:text-2xl text-violet-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Simplifica tus operaciones de comercio exterior con nuestras
              herramientas especializadas. Calcula impuestos, busca partidas
              arancelarias y más.
            </p>

            {/* Botón CTA */}
            <Link
              href="/calculator"
              className="inline-block bg-white text-violet-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🧮 Probar Calculadora de Aduanas
            </Link>
          </div>
        </div>

        {/* Onda decorativa */}
        <div className="relative">
          <svg
            className="w-full h-12 md:h-16"
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48h1440V0c-240 48-480 48-720 0S240 0 0 0v48z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </section>

      {/* ===== GRID DE HERRAMIENTAS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Título de sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Herramientas Disponibles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestro conjunto de herramientas diseñadas específicamente
            para facilitar tus operaciones de importación y comercio exterior.
          </p>
        </div>

        {/* Grid de tarjetas de herramientas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* ===== SECCIÓN DE BENEFICIOS ===== */}
      <section className="bg-gradient-to-br from-gray-50 to-violet-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué usar Aduanas Tools?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diseñado por y para profesionales del comercio exterior
            </p>
          </div>

          {/* Grid de beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beneficio 1 */}
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Rápido y Preciso
              </h3>
              <p className="text-gray-600">
                Obtén resultados instantáneos con cálculos precisos basados en
                las regulaciones aduaneras vigentes.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fácil de Usar
              </h3>
              <p className="text-gray-600">
                Interfaz intuitiva diseñada para que cualquier persona pueda
                usarla sin necesidad de capacitación.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                100% Gratuito
              </h3>
              <p className="text-gray-600">
                Todas nuestras herramientas son completamente gratuitas. Sin
                suscripciones ni costos ocultos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION FINAL ===== */}
      <section className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para simplificar tus importaciones?
          </h2>
          <p className="text-xl text-violet-100 mb-8">
            Comienza a usar nuestras herramientas ahora mismo
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-white text-violet-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Comenzar Ahora →
          </Link>
        </div>
      </section>
    </div>
  );
}
