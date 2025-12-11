/**
 * ============================================================================
 * COMPONENTE: TOOL CARD
 * ============================================================================
 * Tarjeta reutilizable para mostrar cada herramienta en el centro.
 * Incluye icono, título, descripción y estado (disponible/próximamente).
 */

import Link from "next/link";
import type { Tool } from "@/config/tools";

type ToolCardProps = {
    /** Datos de la herramienta a mostrar */
    tool: Tool;
};

/**
 * ToolCard - Tarjeta visual para una herramienta
 * 
 * CARACTERÍSTICAS:
 * - Diseño tipo tarjeta con hover effect
 * - Muestra icono, título y descripción
 * - Link a la herramienta si está disponible
 * - Badge "Próximamente" si no está disponible
 * - Animaciones sutiles al hacer hover
 * 
 * @param tool - Objeto con la información de la herramienta
 */
export function ToolCard({ tool }: ToolCardProps) {
    // Si la herramienta no está disponible, mostramos la tarjeta sin link
    if (!tool.available) {
        return (
            <div className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 opacity-75 cursor-not-allowed">
                {/* Badge "Próximamente" */}
                <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Próximamente
                </div>

                {/* Icono de la herramienta */}
                <div className="text-4xl mb-4">{tool.icon}</div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {tool.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                </p>
            </div>
        );
    }

    // Si la herramienta está disponible, mostramos un link clickeable
    return (
        <Link
            href={tool.href}
            className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 block"
        >
            {/* Icono de la herramienta con animación */}
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
            </div>

            {/* Título con color que cambia al hover */}
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 mb-2 transition-colors truncate">
                {tool.title}
            </h3>

            {/* Descripción */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 text-clamp-2">
                {tool.description}
            </p>

            {/* Flecha indicadora con animación */}
            <div className="flex items-center text-violet-600 font-semibold text-sm">
                <span>Abrir herramienta</span>
                <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </Link>
    );
}
