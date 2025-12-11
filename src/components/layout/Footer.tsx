/**
 * ============================================================================
 * COMPONENTE: FOOTER
 * ============================================================================
 * Footer informativo que aparece en todas las páginas.
 * Incluye información útil y enlaces.
 */

import Link from "next/link";

/**
 * Footer - Pie de página del sitio
 * 
 * CARACTERÍSTICAS:
 * - Información de contacto
 * - Enlaces útiles
 * - Copyright
 * - Diseño limpio y profesional
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* ===== COLUMNA 1: SOBRE EL PROYECTO ===== */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-3xl">🚢</span>
                            <span className="text-xl font-bold text-white">Aduanas Tools</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Centro de herramientas especializadas para importadores y profesionales
                            de comercio exterior. Simplificamos tus operaciones aduaneras.
                        </p>
                    </div>

                    {/* ===== COLUMNA 2: HERRAMIENTAS ===== */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Herramientas</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/calculator" className="hover:text-blue-400 transition-colors">
                                    🧮 Calculadora de Aduanas
                                </Link>
                            </li>
                            <li className="text-gray-500">🔍 Buscador de Partidas (Próximamente)</li>
                            <li className="text-gray-500">📦 Rastreador de Envíos (Próximamente)</li>
                            <li className="text-gray-500">📄 Generador de Documentos (Próximamente)</li>
                        </ul>
                    </div>

                    {/* ===== COLUMNA 3: RECURSOS ===== */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Recursos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://www.sunat.gob.pe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-violet-400 transition-colors"
                                >
                                    SUNAT
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.gob.pe/aduanas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-violet-400 transition-colors"
                                >
                                    Aduanas Perú
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.siicex.gob.pe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-violet-400 transition-colors"
                                >
                                    SIICEX
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ===== LÍNEA DIVISORIA ===== */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                        <p>
                            © {currentYear} Aduanas Tools. Desarrollado para importadores peruanos.
                        </p>
                        <p className="mt-2 md:mt-0 text-gray-500">
                            Hecho con ❤️ para facilitar el comercio exterior
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
