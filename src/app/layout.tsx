/**
 * ============================================================================
 * ROOT LAYOUT
 * ============================================================================
 * Layout principal de la aplicación.
 * Incluye estilos globales, fuentes, metadata y componentes de navegación.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * Configuración de la fuente Inter de Google Fonts
 * Inter es una fuente moderna y legible, ideal para interfaces web
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Metadata del sitio para SEO
 * Aparece en los resultados de búsqueda y al compartir en redes sociales
 */
export const metadata: Metadata = {
  title: "Aduanas Tools - Centro de Herramientas para Importadores",
  description:
    "Centro de herramientas especializadas para importadores y profesionales de comercio exterior. Calculadora de aduanas, buscador de partidas arancelarias y más.",
  keywords: [
    "aduanas",
    "importación",
    "comercio exterior",
    "calculadora aduanera",
    "partidas arancelarias",
    "IGV",
    "derechos arancelarios",
  ],
};

/**
 * RootLayout - Componente principal que envuelve toda la aplicación
 * 
 * ESTRUCTURA:
 * - HTML con idioma español
 * - Body con fuente Inter
 * - Navbar en la parte superior
 * - Contenido principal (children)
 * - Footer en la parte inferior
 * 
 * @param children - Contenido de cada página
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar fijo en la parte superior */}
        <Navbar />

        {/* Contenido principal - flex-1 hace que ocupe todo el espacio disponible */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer siempre al final */}
        <Footer />
      </body>
    </html>
  );
}
