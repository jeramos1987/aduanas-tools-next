/**
 * ============================================================================
 * COMPONENTE: NAVBAR
 * ============================================================================
 * Barra de navegación principal del sitio.
 * Aparece en todas las páginas y permite navegar entre herramientas.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/config/tools";
import { useState } from "react";

/**
 * Navbar - Barra de navegación principal
 * 
 * CARACTERÍSTICAS:
 * - Logo y nombre del sitio
 * - Enlaces a herramientas disponibles
 * - Menú móvil responsive
 * - Resalta la página actual
 * - Diseño moderno con gradiente
 */
export function Navbar() {
    // Hook para obtener la ruta actual y resaltar el link activo
    const pathname = usePathname();

    // Estado para controlar el menú móvil (abierto/cerrado)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Filtramos solo las herramientas disponibles para mostrar en el navbar
    const availableTools = TOOLS.filter((tool) => tool.available);

    return (
        <nav className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* ===== LOGO Y NOMBRE ===== */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="text-3xl transform group-hover:scale-110 transition-transform">
                            🚢
                        </div>
                        <div>
                            <div className="text-xl font-bold">Aduanas Tools</div>
                            <div className="text-xs text-violet-100">Centro de Herramientas</div>
                        </div>
                    </Link>

                    {/* ===== NAVEGACIÓN DESKTOP ===== */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* Link a inicio */}
                        <Link
                            href="/"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${pathname === "/"
                                ? "bg-white/20 text-white"
                                : "text-violet-50 hover:bg-white/10"
                                }`}
                        >
                            Inicio
                        </Link>

                        {/* Links a herramientas disponibles */}
                        {availableTools.map((tool) => (
                            <Link
                                key={tool.id}
                                href={tool.href}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${pathname === tool.href
                                    ? "bg-white/20 text-white"
                                    : "text-violet-50 hover:bg-white/10"
                                    }`}
                            >
                                {tool.icon} {tool.title}
                            </Link>
                        ))}
                    </div>

                    {/* ===== BOTÓN MENÚ MÓVIL ===== */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Abrir menú"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* ===== MENÚ MÓVIL ===== */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-2 rounded-lg font-medium transition-colors ${pathname === "/"
                                ? "bg-white/20 text-white"
                                : "text-violet-100 hover:bg-white/10"
                                }`}
                        >
                            Inicio
                        </Link>

                        {availableTools.map((tool) => (
                            <Link
                                key={tool.id}
                                href={tool.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${pathname === tool.href
                                    ? "bg-white/20 text-white"
                                    : "text-violet-100 hover:bg-white/10"
                                    }`}
                            >
                                {tool.icon} {tool.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
